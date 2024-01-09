function getIndexOfHeavyBall(arr) {
    const subArr1 = arr.slice(0, 3);
    const subArr2 = arr.slice(3, 6);

    const sum1 = subArr1.reduce((acc, ele) => acc + ele, 0)
    const sum2 = subArr2.reduce((acc, ele) => acc + ele, 0)

    if (sum1 > sum2) {
        return getHeavyBallInSubArray(arr, subArr1);
    } else if (sum1 < sum2) {
        return getHeavyBallInSubArray(arr, subArr2);
    } else {
        const subArr3 = arr.slice(6);
        if (subArr3[0] > subArr3[1]) {
            return arr.indexOf(subArr3[0]);
        } else if (subArr3[0] < subArr3[1]) {
            return arr.indexOf(subArr3[1]);
        }
    }
}

function getHeavyBallInSubArray(arr, subArr) {
    if (subArr[0] > subArr[1]) {
        return arr.indexOf(subArr[0]);
    } else if (subArr[0] < subArr[1]) {
        return arr.indexOf(subArr[1])
    } else {
        return arr.indexOf(subArr[2]);
    }
}

function getRandomArray() {
    const arr = Array(8).fill(1);
    const indexOfHeavyBall = Math.floor(Math.random() * 8);
    arr[indexOfHeavyBall] = 2;
    return arr;
}

const arr = getRandomArray();

console.log('Random array: ' + arr);
console.log('Index of the heavy ball is: ' + getIndexOfHeavyBall(arr));