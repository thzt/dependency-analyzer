const findFiles = require('./find-files');
const getFileDeps = require('./get-file-deps');

const excludeRegExp = /node_modules/;
const typeRegExp = /\.js$/;

const createDepGraph = ({
    base,
    resolve,    // resolve = (base,file,depName) => depFileAbsolutePath
}) => {
    const files = findFiles({
        dirs: [base],
        type: typeRegExp,
        exclude: excludeRegExp
    });

    const graph = files.reduce((memo, file) => {
        const deps = getFileDeps({
            base,
            file,
            resolve
        });

        memo[file] = deps;
        return memo;
    }, {});

    return graph;
};

module.exports = createDepGraph;