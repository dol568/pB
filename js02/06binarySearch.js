module.exports = function binarySearch(inputarray, targetElement) {

    if (inputarray.length === 0) return -1;

    let L = 0;
    let R = inputarray.length - 1;

    while (L <= R) {
        let m = Math.floor((L + R) / 2);
        if (inputarray[m] < targetElement) {
            L = m + 1;
        } else if (inputarray[m] > targetElement) {
            R = m - 1;
        } else {
            return m;
        }
    }
    return -1;
}