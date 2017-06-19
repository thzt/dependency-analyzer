/*
    1. content
    find all matches in `str` by `reg`.
    we will put all these match and capture to an array.

    2. key point
    if there is no match, we will return `null` instead of an empty array.
*/

const findMatches = (reg, str) => {
    const matches = [];

    let match;
    let isMatch = false;

    while (match = reg.exec(str)) {
        isMatch = true;
        matches.push(match);
    }

    return isMatch
        ? matches
        : null;
}

module.exports = findMatches;