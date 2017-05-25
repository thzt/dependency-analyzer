const createDepGraph = require('./src/create-dep-graph');
const createResolve = require('./src/create-resolve');

const moduleDir = 'node_modules/';
const base = './';

const graph = createDepGraph({
    base,
    resolve: createResolve(moduleDir)
});

console.log(JSON.stringify(graph, null, 4));