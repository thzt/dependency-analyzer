const fileRegExp = /(.+\/).*?/;

const getDir = path => {
    const [_, dir] = fileRegExp.exec(path);
    return dir;
};

module.exports = getDir;