const fs = require('fs');
const isFile = path => {
    try {
        const stat = fs.lstatSync(path);
        return stat.isFile();
    } catch (ex) {
        return false;
    }
};

module.exports = isFile;