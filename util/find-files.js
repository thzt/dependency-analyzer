/*
    1. content
    `findFiles` will find all files in the given directory in the synchronous way.
    we can specify `fileTypeRegExp` which filter the file extensions, and `excludeRegExp` which filter unnecessary directories.
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