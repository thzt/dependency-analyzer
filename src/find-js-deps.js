/*
    1. 内容
    该模块提供了js文件之间依赖关系的查找策略。

    例如，require('./x'); 其中'./x'称为依赖名。
    本模块的主要目的是根据依赖名尝试得到一个实际存在的文件绝对路径。

    （1）如果依赖名是'/'开头的，那么就用base作为根目录，
    （2）如果依赖名是'.'开头的，就认为是一个相对路径，根据当前文件所在目录进行查找
    （3）否则，认为这是一个node_modules依赖，从base/moduleDir中查找，其中base和moduleDir都是可配的

    （4）根据上述三种情况得到路径，开始尝试匹配各种文件名，extensions也是传入的配置项

    2. 关键点
    （1）从js文件获取它所有的依赖名，使用了开源precinct模块，
    该模块可以适配多种情况，包括cmd amd commonjs

    （2）对于极少数文件，precinct会抛异常，例如：
    ```
    define(['some'], function (require) {
        require(1 + 2);
    });
    ```
    
    precinct会认为`require(1 + 2);`是进行模块调用，而实际上require可以是任意函数。
*/

const fs = require('fs');
const path = require('path');
const precinct = require('precinct');

const isFile = require('../util/is-file');
const getDir = require('../util/get-dir');

const isAbsolutePathRegExp = /^\//;
const isRelativePathRegExp = /^\./;

const getAbsolutePath = (base, moduleDir, currentFilePath, depName) => {
    if (isAbsolutePathRegExp.test(depName)) {
        return path.join(base, depName);
    }

    const dir = getDir(currentFilePath);
    if (isRelativePathRegExp.test(depName)) {
        return path.join(dir, depName);
    }

    return path.join(base, moduleDir, depName);
};

const tryFindFile = (absolutePath, mainFileName, extensions) => {
    const extensionRegExp = new RegExp(`^(.+)(\\${extensions.join('|\\')})$`);

    const match = extensionRegExp.exec(absolutePath);
    const hasExtension = match != null;

    let filePath;
    let isFound = false;

    isFound = extensions.some(extension =>
        hasExtension
            ? isFile(filePath = absolutePath)
            : isFile(filePath = absolutePath + extension));

    if (isFound) {
        return {
            isFound: true,
            filePath,
        };
    }

    isFound = extensions.some(extension => hasExtension
        ? isFile(filePath = path.join(match[1], mainFileName) + match[2])
        : isFile(filePath = path.join(absolutePath, mainFileName) + extension));

    if (isFound) {
        return {
            isFound: true,
            filePath,
        };
    }

    return {
        isFound: false,
        filePath: null
    }
}

const tryFindDepNames = content =>{
    try{
        return precinct(content);
    }
    catch(e){

        // some file may throw exception, for example: 
        /*
            define(['some'], function (require) {
                require(1 + 2);
            });
        */
        return [];
    }
};

const findJsDeps = ({
    base,
    moduleDir,
    extensions,
    mainFileName,

    filePath,
}) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const depNames = tryFindDepNames(content);

    const depFilePaths = depNames.map(depName => {
        const absolutePath = getAbsolutePath(base, moduleDir, filePath, depName);
        const { isFound, filePath: depFilePath } = tryFindFile(absolutePath, mainFileName, extensions);

        return isFound ? depFilePath : depName;
    });

    return depFilePaths;
};

module.exports = findJsDeps;