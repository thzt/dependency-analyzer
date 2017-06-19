/*
    1. content 
    the `Graph` class encapsulate the operations on the dependencies.

    2. key point
    the dependencies can be represent by a json.
    ```
    {
        a:[
            b,
            c,
            x
        ],
        b:[
            c
        ]
    }
    ```

    we can see that, we don't list the dependencies of `x`, although `x` is dependented by `a`.
    we only list the vertexes we interest, so the json is not a complete adjancency list representation of a graph.

    therefor, `getAllVertexes` is different from `getAllDepVertexes`,
    the first one will return the vertexes we interest, and the last one will return all vertexes involved.
*/

const union = require('./union');

class Graph {
    constructor(adjacencyList = {}) {
        const graph = this;
        graph.adjacencyList = adjacencyList;
    }

    // add edges from `vertex` to `otherVertexes`
    addEdges(vertex, otherVertexes) {
        const graph = this;
        const { adjacencyList } = graph;

        adjacencyList[vertex] = adjacencyList[vertex] == null
            ? otherVertexes
            : adjacencyList[vertex].concat(otherVertexes);

        return graph;
    }

    // get all vertexes we interest.
    getAllVertexes() {
        const graph = this;
        const { adjacencyList } = graph;

        return Object.keys(adjacencyList);
    }
    
    // get all vertexes involved.
    getAllDepVertexes() {
        const graph = this;
        const { adjacencyList } = graph;

        const result = Object.keys(adjacencyList).reduce((memo, vertex) => {
            const depVertexes = adjacencyList[vertex];

            depVertexes.forEach(depVertex => {
                memo[depVertex] = true;
            });

            return memo;
        }, {});

        return Object.keys(result);
    }

    // convert the graph to a json
    toJSON() {
        const graph = this;
        const { adjacencyList } = graph;

        // deep copy
        // use `stringify` and `parse` to get a new json to avoid modify it by reference.
        return JSON.parse(JSON.stringify(adjacencyList));
    }

    // get the transitive closure which dependent the vertex set `vertexes`.
    getDeps(vertexes, includeSelf = true) {
        const graph = this;
        const { adjacencyList } = graph;

        const search = (vertexes, adjacencyList) =>
            union(...vertexes.map(vertex => adjacencyList[vertex] == null ? [] : adjacencyList[vertex]))

        const depVertexes = graph._recursiveSearch(vertexes, search);
        return includeSelf ? union(vertexes, depVertexes) : depVertexes;
    }

    // get the transitive closure which is dependented by the vertext set `vertexes`.
    getRefs(vertexes, includeSelf = true) {
        const graph = this;
        const { adjacencyList } = graph;

        const search = (vertexes, adjacencyList) => graph.getDirectRefs(vertexes);

        const refVertexes = graph._recursiveSearch(vertexes, search);
        return includeSelf ? union(vertexes, refVertexes) : refVertexes;
    }

    // get the direct reference of the vertex set `vertexes`.
    getDirectRefs(vertexes) {
        const graph = this;
        const { adjacencyList } = graph;

        const directRefs = Object.keys(adjacencyList).filter(vertex =>
            adjacencyList[vertex].some(depVertex => vertexes.some(vertex => depVertex === vertex)));

        return directRefs;
    }

    // merge two graph, `noDuplicateKey` use to distinguish the case whether report an error when a duplicate key is found.
    merge(anotherGraph, noDuplicateKey = true) {
        const graph = this;

        const json1 = graph.toJSON();
        const json2 = anotherGraph.toJSON();

        Object.keys(json2).forEach(key => {
            const value = json2[key];

            if (json1[key] != null && noDuplicateKey) {
                throw new Error(`duplicate key: ${key}`);
            }

            json1[key] = value;
        });

        return new Graph(json1);
    }

    // private method 

    // a recursive function used to get the transitive closure of a given `search` strategy.
    _recursiveSearch(vertexes, search) {
        const graph = this;
        const { adjacencyList } = graph;

        const resultVertexes = search(vertexes, adjacencyList);
        if (resultVertexes.length === 0) {
            return resultVertexes;
        }

        return union(resultVertexes, graph._recursiveSearch(resultVertexes, search));
    }
}

module.exports = Graph;