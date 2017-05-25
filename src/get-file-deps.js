const fs = require('fs');
const findDepNames = require('./find-dep-names');

const getFileDeps = ({ base, file, resolve }) => {
    const content = fs.readFileSync(file, 'utf-8');
    const depNames = findDepNames(content);
    const depPaths = depNames.reduce((memo, depName) => {
        const { isFound, filePath } = resolve({
            base,
            file,
            depName
        });

        if (isFound) {
            memo.push(filePath);
            return memo;
        }

        memo.push(depName);
        return memo;
    }, []);

    return depPaths;
};

module.exports = getFileDeps;