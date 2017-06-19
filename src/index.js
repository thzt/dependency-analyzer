/*
    1. content
    using the module `createDepGraph` by config the strategy of `findJsDeps` we will get a js analyzer.
*/

const findFiles = require('../util/find-files');
const createDepGraph = require('../util/create-dep-graph');

const findJsDeps = require('./find-js-deps');

const jsAnalyzer = ({
    base,
    moduleDir,
    mainFileName,
    extensions,

    fileTypeRegExp,
    excludeRegExp
}) => createDepGraph({
        vertexes: findFiles({
            absoluteDir: base,
            fileTypeRegExp,
            excludeRegExp
        }),
        findEdges: jsPath => findJsDeps({
            base,
            moduleDir,
            mainFileName,
            extensions,
            filePath: jsPath,
        })
    });

module.exports = jsAnalyzer;