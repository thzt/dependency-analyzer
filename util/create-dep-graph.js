/*
    1. 内容
    本模块提供一个函数createDepGraph用于创建依赖关系图，
    其中，依赖关系图用Graph类进行管理，
    createDepGraph根据用户提供的顶点vertexes，
    以及如何从顶点找到边的策略findEdges=(vertex)=>edges 来构建Graph。
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