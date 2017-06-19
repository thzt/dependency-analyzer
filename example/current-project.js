/*
    1. 内容
    计算当前node应用，js文件之间的依赖关系
*/

const path = require('path');
const jsAnalyzer = require('../src/index');

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