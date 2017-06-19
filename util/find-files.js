/*
    1. 内容
    findFiles使用同步方式查找指定文件夹下的文件，
    可以指定文件所满足的正则表达式fileTypeRegExp，还可以指定不查找某些目录excludeRegExp。
*/

const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const findFiles = ({ absoluteDir, fileTypeRegExp, excludeRegExp }) => recursiveReaddirSync(absoluteDir).filter(filePath => {
    if (!fileTypeRegExp.test(filePath)) {
        return false;
    }

    if (excludeRegExp == null) {
        return true;
    }

    if (excludeRegExp.test(filePath)) {
        return false;
    }

    return true;
});


module.exports = findFiles;