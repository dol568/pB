function sum(arr) {
    let sum = 0;

    for (let element of arr) {
        sum += element;
    }
    return sum;
}

function sumOfFirstAndLast(arr) {
    return arr[0] + arr[arr.length - 1];
}

function reverseArray(arr) {
    let copyArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        copyArray.push(arr[i]);
    }
    return copyArray;
}

function getMinFromRandomNumbers(arr, attempts) {
    if (arr.length === 0 || attempts <= 0) {
        return null;
    }
    let randomNumbers = [];
    let minVal = Infinity;

    for (let i = 0; i < attempts; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        randomNumbers.push(arr[randomIndex]);
    }

    for (let i = 0; i < randomNumbers.length; i++) {
        if (randomNumbers[i] < minVal) {
            minVal = randomNumbers[i];
        }
    }
    return {randomNumbers, minVal};
}

function randomizeArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}

function sumOdd(arr) {
    let sum = 0;
    for (let num of arr) {
        if (num % 2 !== 0) sum += num;
    }
    return sum;
}

function addEvenSubtractOdd(arr, startValue = 0) {
    for (let num of arr) {
        (num % 2 === 0) ? startValue += num : startValue -= num;
    }
    return startValue;
}

module.exports = {
    sum,
    sumOfFirstAndLast,
    reverseArray,
    getMinFromRandomNumbers,
    randomizeArray,
    sumOdd,
    addEvenSubtractOdd
};