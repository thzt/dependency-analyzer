/*
    1. content
    in this module, we provide a strategy to finding files by dependency names.

    for example:
    `require('./x');`, we call './x' the dependency name.
    `findJsDeps` will find a file with absolute path by the dependency name.

    (1) if the beginning of the dependency name is '/', we will use `base` as the root directory.
    (2) if `.`, we will treat it as a relative path, find the file from current directory.
    (3) otherwise, it must dependent with `node_modules`, will find the file from `${base}/${moduleDir}`.

    after these three steps, we then try to match all the given `extensions` of files.

    2. key point
    (1) we use `precinct` module to find all dependency names of a js file.
    this module can deal with several cases, such as CMD, AMD or COMMONJS.

    (2) `precinct` will throw exception, in quite few file.
    ```
    define(['some'], function (require) {
        require(1 + 2);
    });
    ```

    in this case, `precinct` will treat `require(1 + 2);` as a module require function,
    but in fact, the `require` can be any arbitrary functions.
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