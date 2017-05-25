const precinct = require('precinct');
const findDepNames = fileContent => precinct(fileContent);

module.exports = findDepNames;