const path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const findFiles = ({ dirs, type, exclude }) =>
    [].concat.apply([], dirs.map(dir =>
        recursiveReaddirSync(path.resolve(dir)).filter(path => type.test(path) && !exclude.test(path))));

module.exports = findFiles;