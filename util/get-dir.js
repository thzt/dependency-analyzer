/*
    1. content
    get the including directory of a give file.

    TODO: there may be a library base of the file system to achieve this goal.
*/

const fileRegExp = /(.+\/).*?/;

const getDir = path => {
    const [_, dir] = fileRegExp.exec(path);
    return dir;
};

module.exports = getDir;