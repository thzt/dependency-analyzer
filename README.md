## dependency-analyzer

### 1. analyze js files

```
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
```

This will get the dependencies of the [current project](https://github.com/thzt/dependency-analyzer/blob/master/example/current-project.js), the dependent graph is shown as an [adjacency list](https://github.com/thzt/dependency-analyzer/blob/master/example/current-project.json).

```
{
    "/Users/thzt/Github/dependency-analyzer/example/current-project.js": [
        "path",
        "/Users/thzt/Github/dependency-analyzer/src/index.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/find-js-deps.js": [
        "fs",
        "path",
        "/Users/thzt/Github/dependency-analyzer/node_modules/precinct/index.js",
        "/Users/thzt/Github/dependency-analyzer/util/is-file.js",
        "/Users/thzt/Github/dependency-analyzer/util/get-dir.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/index.js": [
        "/Users/thzt/Github/dependency-analyzer/util/find-files.js",
        "/Users/thzt/Github/dependency-analyzer/util/create-dep-graph.js",
        "/Users/thzt/Github/dependency-analyzer/src/find-js-deps.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/util/create-dep-graph.js": [
        "/Users/thzt/Github/dependency-analyzer/util/graph.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/util/find-files.js": [
        "path",
        "/Users/thzt/Github/dependency-analyzer/node_modules/recursive-readdir-sync/index.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/util/find-matches.js": [],
    "/Users/thzt/Github/dependency-analyzer/util/get-dir.js": [],
    "/Users/thzt/Github/dependency-analyzer/util/graph.js": [
        "/Users/thzt/Github/dependency-analyzer/util/union.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/util/is-file.js": [
        "fs"
    ],
    "/Users/thzt/Github/dependency-analyzer/util/union.js": []
}
```

### 2. analyze user-defined dependencies

```
const { jsAnalyzer, createDepGraph } = require('../index');
```

We can use `jsAnalyzer` to get the dependencies of js files.

Besides, we can also use `createDepGraph` to analyze any **user-defined dependencies**, 

by passing `vertexes` and a strategy `findEdges` to it.