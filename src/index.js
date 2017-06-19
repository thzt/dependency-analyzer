/*
    1. 内容
    使用createDepGraph模块，通过配置js的模块查找策略，得到js依赖关系分析器。

    其中，findJsDeps表示了js文件之间依赖关系的查找策略。
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