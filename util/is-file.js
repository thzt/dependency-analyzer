/*
    1. 内容
    基于文件系统，判断某个路径是否表示一个文件。

    某个路径可能没有任何东西，或者是一个文件夹，或者是一个文件。
    如果路径上没有任何东西，fs.lstatSync会抛异常。
*/

const fs = require('fs');

const isFile = path => {
    try {
        const stat = fs.lstatSync(path);

        // path is exist but not a file 
        return stat.isFile();
    } catch (ex) {

        // path is not exist
        return false;
    }
};

module.exports = isFile;