/*
    1. content
    a utility function, used to get the union set.

    2. key point
    the set must be represented by an array of string.
*/

const union = (...arrays) => {
    const cache = {};
    [].concat.apply([], arrays).forEach(item => {
        if (cache[item]) {
            return;
        }

        cache[item] = true;
    });

    return Object.keys(cache);
};

module.exports = union;