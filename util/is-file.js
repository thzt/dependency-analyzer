/*
    1. content
    Determine whether or not a given `path` representing a file.

    if there is nothing in the `path`, then an exception will be catched.
    otherwise if it must be a directory or a file.
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