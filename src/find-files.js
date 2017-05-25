const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const findFiles = ({ dirs, type, exclude }) =>
    [].concat.apply(
        [],
        dirs.map(dir => path.resolve(dir))
            .map(absoluteDir => recursiveReaddirSync(absoluteDir).filter(path => type.test(path) && !exclude.test(path)))
    );

module.exports = findFiles;