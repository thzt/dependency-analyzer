/*
    1. 内容
    找出str中所有满足reg的匹配，并将匹配和捕获放到一个数组中。

    2. 关键点
    如果没有任何匹配，并不会返回一个空数组，而是返回null。
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