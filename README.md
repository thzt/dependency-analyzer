### dependency-analyzer

We can pass user-defined `resolve` method to the analyzer, it will direct the analyzer to find the dependent file.

```
resolve = (base,file,depName) => depFileAbsolutePath
```

The `resolve` will receive `base`，`file`，`depName` as parameters, should return the absolute path of the dependent file.

The `base` means the absolute path of the project directory, such as `./`.

The `file` means the absolute path of the file which we are resolving.

The `depName` means the dependent of the `file`,for example, in current project `index.js` depends on `./src/create-dep-graph`.

- - -

### example

```
const createDepGraph = require('./src/create-dep-graph');
const createResolve = require('./src/create-resolve');

const moduleDir = 'node_modules/';
const base = './';

const graph = createDepGraph({
    base,
    resolve: createResolve(moduleDir)
});

console.log(JSON.stringify(graph, null, 4));
```

This will get the dependencies of the current project, the dependent graph is shown as an adjacency list.

```
{
    "/Users/thzt/Github/dependency-analyzer/index.js": [
        "/Users/thzt/Github/dependency-analyzer/src/create-dep-graph.js",
        "/Users/thzt/Github/dependency-analyzer/src/create-resolve.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/create-dep-graph.js": [
        "/Users/thzt/Github/dependency-analyzer/src/find-files.js",
        "/Users/thzt/Github/dependency-analyzer/src/get-file-deps.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/create-resolve.js": [
        "path",
        "/Users/thzt/Github/dependency-analyzer/src/is-file.js",
        "/Users/thzt/Github/dependency-analyzer/src/get-dir.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/find-dep-names.js": [
        "node_modules/precinct/index.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/find-files.js": [
        "path",
        "node_modules/recursive-readdir-sync/index.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/get-dir.js": [],
    "/Users/thzt/Github/dependency-analyzer/src/get-file-deps.js": [
        "fs",
        "/Users/thzt/Github/dependency-analyzer/src/find-dep-names.js"
    ],
    "/Users/thzt/Github/dependency-analyzer/src/is-file.js": [
        "fs"
    ]
}
```