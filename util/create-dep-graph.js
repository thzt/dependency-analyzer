/*
    1. content
    `createDepGraph` can be used to create a graph.
    The `Graph` is a data structure used to represent the dependencies.

    user should provide `vertexes` and the relation of the `vertexes` to `createDepGraph`,
    `createDepGraph` will call `findEdges` in each vertex and get the adjancent vertexes from it.
    the `findEdges` has the type of `(vertex)=>otherVertexes`.
*/

const Graph = require('./graph');

const createDepGraph = ({ vertexes, findEdges }) => {
    const graph = new Graph;

    vertexes.forEach(vertex => {
        const edges = findEdges(vertex);
        graph.addEdges(vertex, edges);
    });

    return graph;
};

module.exports = createDepGraph;