module.exports = function fibonacci(n) {
    if (n === 0) {
        return [];
    } else if (n === 1) {
        return [n];
    } else if (n === 2) {
        return [0, 1];
    } else {
        let prev = fibonacci(n - 1);
        prev.push(prev[prev.length - 1] + prev[prev.length - 2]);
        return prev;
    }
}