const path = require('path');
const isFile = require('./is-file');
const getDir = require('./get-dir');

const extensions = [
    '.js',
    '.jsx'
];

const main = 'index';

const isAbsolutePathRegExp = /^\//;
const isRelativePathRegExp = /^\./;
const extensionRegExp = new RegExp(`^(.+)(\\${extensions.join('|\\')})$`);

const getAbsolutePath = (base, file, depName, moduleDir) => {
    const dir = getDir(file);

    if (isAbsolutePathRegExp.test(depName)) {
        return path.join(base, depName);
    }

    if (isRelativePathRegExp.test(depName)) {
        return path.join(dir, depName);
    }

    return path.join(base, moduleDir, depName);
};

const tryFindFile = absoluteDep => {
    const match = extensionRegExp.exec(absoluteDep);
    const hasExtension = match != null;

    let filePath;
    let isFound = false;

    isFound = extensions.some(extension => hasExtension
        ? isFile(filePath = absoluteDep)
        : isFile(filePath = absoluteDep + extension));

    if (isFound) {
        return {
            isFound,
            filePath,
        };
    }

    isFound = extensions.some(extension => hasExtension
        ? isFile(filePath = path.join(match[1], main) + match[2])
        : isFile(filePath = path.join(absoluteDep, main) + extension));

    if (isFound) {
        return {
            isFound,
            filePath,
        };
    }

    return {
        isFound,
    }
}

const createResolve = moduleDir => ({
    base,
    file,
    depName
}) => {
    const absoluteDep = getAbsolutePath(base, file, depName, moduleDir);
    const result = tryFindFile(absoluteDep);

    return result;
};

module.exports = createResolve;