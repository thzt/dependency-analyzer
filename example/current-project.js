/*
    1. content
    calculate the dependencies of js files in the current project.
*/

const path = require('path');
const { jsAnalyzer } = require('../index');

const fileTypeRegExp = /\.js$/;
const excludeRegExp = /node_modules/;

const base = path.resolve('../');
const moduleDir = 'node_modules';
const extensions = [
    '.js',
];
const mainFileName = 'index';

const graph = jsAnalyzer({
    base,
    moduleDir,
    mainFileName,
    extensions,

    fileTypeRegExp,
    excludeRegExp
});

console.log(JSON.stringify(graph.toJSON(), null, 4));