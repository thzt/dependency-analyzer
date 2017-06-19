/*
    1. content
    `jsAnalyzer` is used to analyze the dependencies of js files.
    while `createDepGraph` can be used to analyze any user-defined dependencies.
*/

const jsAnalyzer = require('./js-analyzer/index');
const createDepGraph = require('./util/create-dep-graph');

module.exports = {
    jsAnalyzer,
    createDepGraph
};