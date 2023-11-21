const arr = require('./01arrays');
const binarySearch = require('./06binarySearch');
const selectionSort = require('./07selectionSort');
const caesarCipher = require('./03caesarCipher');
const numberOfDaysTillFriday = require('./02days');
const fibonacci = require('./04fibonacci');
const mergeSort = require('./08mergeSort');
const primes = require('./05primes');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let example1 = [1, 6, 23, 8, 4, 8, 3, 7];
let example2 = [1, 6, 23, 8, 4, 98, 3, 7, 3, 98, 4, 98];

function caesarCipherMenu() {
    rl.question(
        "Choose\n" +
        "1. Encrypt a string\n" +
        "2. Decrypt a string\n" +
        "3. Go Back To Main Menu\n", input => {
            const choice = +input;

            switch (choice) {
                case 1:
                    rl.question(`Input message to be encrypted: `, input1 => {
                        rl.question(`Input shift number: `, input2 => {
                            console.log(`Encrypted message: ${caesarCipher.encode(input1, +input2)}`);
                            caesarCipherMenu();
                        });
                    });
                    break;
                case 2:
                    rl.question(`Input message to be decrypted: `, input1 => {
                        rl.question(`Input shift number: `, input2 => {
                            console.log(`Decrypted message: ${caesarCipher.decode(input1, +input2)}`);
                            caesarCipherMenu();
                        });
                    });
                    break;
                case 3:
                    mainMenu();
                default:
                    caesarCipherMenu();
            }
        });
}

function primeNumbersMenu() {
    rl.question(
        "Choose\n" +
        "1. Check If Number Is A Prime Number\n" +
        "2. Display Prime Numbers\n" +
        "3. Go Back To Main Menu\n", input => {
            const choice = +input;

            switch (choice) {
                case 1:
                    rl.question(`Input number to check if it is a prime number: `, input => {
                        console.log(`Entered number is Prime? : ${primes.isPrime(+input)}`);
                        primeNumbersMenu();
                    });
                    break;
                case 2:
                    rl.question(`Enter the value up to which you want to display prime numbers: `, input => {
                        console.log(`Prime numbers up to ${input}: ${primes.primeNumbers(+input)}`);
                        primeNumbersMenu();
                    });
                    break;
                case 3:
                    mainMenu();
                default:
                    primeNumbersMenu();
            }
        });
}

function arraysMenu() {
    rl.question(
        "Choose\n" +
        "1. Array Sum\n" +
        "2. Array FirstAndLast\n" +
        "3. Reverse Array\n" +
        "4. Min Value From Array\n" +
        "5. Randomize Array\n" +
        "6. Sum Odd\n" +
        "7. Add Even Subtract Odd\n" +
        "8. Go Back To Main Menu\n", input => {
            const choice = +input;

            switch (choice) {
                case 1:
                    rl.question(`Input array or press Enter for default [${example1}]: `, input => {
                        const subChoice = input === '' ? example1 : input.split(" ").map(Number);
                        console.log(`Sum of all elements in the array: ${arr.sum(subChoice)}`);
                        arraysMenu();
                    });
                    break;
                case 2:
                    rl.question(`Input array or press Enter for default [${example1}]: `, input => {
                        const subChoice = input === '' ? example1 : input.split(" ").map(Number);
                        console.log(`Sum of the first and last element in the array: ${arr.sumOfFirstAndLast(subChoice)}`);
                        arraysMenu();
                    });
                    break;
                case 3:
                    rl.question(`Input array or press Enter for default [${example1}]: `, input => {
                        const subChoice = input === '' ? example1 : input.split(" ").map(Number);
                        console.log(`Array reversed: [${arr.reverseArray(subChoice)}]`);
                        console.log(`Original array: [${subChoice}]`);
                        arraysMenu();
                    });
                    break;
                case 4:
                    rl.question(`Input array or press Enter for default [${example1}]: `, input1 => {
                        rl.question(`Input number of attempts: `, input2 => {
                            const subChoice = input1 === '' ? example1 : input1.split(" ").map(Number);
                            const {randomNumbers, minVal} = arr.getMinFromRandomNumbers(subChoice, +input2);
                            console.log(`Random Numbers Array: [${randomNumbers}]`);
                            console.log(`Min Value: ${minVal}`);
                            arraysMenu();
                        });
                    });
                    break;
                case 5:
                    rl.question(`Input array or press Enter for default [${example1}]: `, input => {
                        const subChoice = input === '' ? [...example1] : input.split(" ").map(Number);
                        console.log(`Shuffled Array: [${arr.randomizeArray(subChoice)}]`);
                        arraysMenu();
                    });
                    break;
                case 6:
                    rl.question(`Input array or press Enter for default [${example2}]: `, input => {
                        const subChoice = input === '' ? example2 : input.split(" ").map(Number);
                        console.log(`Sum Of Odd Numbers: ${arr.sumOdd(subChoice)}`);
                        arraysMenu();
                    });
                    break;
                case 7:
                    rl.question(`Input array or press Enter for default [${example2}]: `, input => {
                        const subChoice = input === '' ? example2 : input.split(" ").map(Number);
                        console.log(`Sum Of Even Numbers And Subtract Odd: ${arr.addEvenSubtractOdd(subChoice)}`);
                        arraysMenu();
                    });
                    break;
                case 8:
                    mainMenu();
                default:
                    arraysMenu();
            }
        });
}

function mainMenu() {
    rl.question(
        "Choose\n" +
        "1. Array Methods\n" +
        "2. Number Of Days Till Friday\n" +
        "3. Caesar Cipher\n" +
        "4. Fibonacci Numbers\n" +
        "5. Prime Numbers\n" +
        "6. Binary Search\n" +
        "7. Selection Sort\n" +
        "8. Merge Sort\n" +
        "9. Exit\n", input => {
            const choice = +input;

            switch (choice) {
                case 1:
                    arraysMenu();
                    break;
                case 2:
                    rl.question("Press Enter to calculate the number of days until Friday: ", () => {
                        const days = numberOfDaysTillFriday();
                        console.log(`There is ${days} days left until Friday`);
                        mainMenu();
                    });
                    break;
                case 3:
                    caesarCipherMenu();
                    break;
                case 4:
                    rl.question("Enter the number of Fibonacci numbers you want to display: ", input => {
                        const nums = fibonacci(input);
                        console.log(`The first ${input} fibonacci numbers are: [${nums}]`);
                        mainMenu();
                    });
                    break;
                case 5:
                    primeNumbersMenu();
                    break;
                case 6:
                    rl.question(`Input array or press Enter for default [${example2}]: `, input1 => {
                        rl.question(`Input target: `, input2 => {
                            const subChoice = input1 === '' ? [...example2] : input1.split(" ").map(Number);
                            let sortedArr = selectionSort(subChoice);
                            console.log(`Sorted array: [${sortedArr}]`);
                            console.log(`Binary search: ${binarySearch(subChoice, input2)}`);
                            mainMenu();
                        });
                    });
                    break;
                case 7:
                    rl.question(`Input array to be sorted or press Enter for default [${example2}]: `, input => {
                        const subChoice = input === '' ? [...example2] : input.split(" ").map(Number);
                        console.log(`Sorted array: [${selectionSort(subChoice)}]`);
                        mainMenu();
                    });
                    break;
                case 8:
                    rl.question(`Input array to be sorted or press Enter for default [${example2}]: `, input => {
                        const subChoice = input === '' ? [...example2] : input.split(" ").map(Number);
                        console.log(`Sorted array: [${mergeSort(subChoice)}]`);
                        mainMenu();
                    });
                    break;
                case 9:
                    rl.close();
                    break;
                default:
                    mainMenu();
            }
        })
}

rl.on("close", () => {
    console.log("Bye");
    process.exit(0);
})

mainMenu();