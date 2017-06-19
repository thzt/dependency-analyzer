/*
    1. 内容
    获取某文件所在的文件夹路径

    TODO: node中可能会有其他基于文件系统的库来完成这件事。
*/

const fileRegExp = /(.+\/).*?/;

const getDir = path => {
    const [_, dir] = fileRegExp.exec(path);
    return dir;
};

module.exports = getDir;