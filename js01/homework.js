let dna = require("./brca1.json");

/////////////////////// SENTENCE CHECKER //////////////////////////
const sentenceChecker = (sentence, letter) => {
    if (typeof sentence !== "string" || typeof letter !== "string") {
        console.log("Input values must be strings");
        return;
    }
    let sanitizedSentence = sentence.replaceAll(".", "").replaceAll(",", "").toLowerCase().trim();

    letter = letter.trim()[0];

/////////////////////// 1st SOLUTION //////////////////////////

    if (sanitizedSentence.length === 0) {
        console.log(`No words in the sentence`);
        return;
    }

    let startIndex = 0;
    let word = "";
    let wordsCounter = 0;
    let letterCounter = 0;
    let maxLenWord = -Infinity;
    let longestWords = "";
    let longestWordsCounter = "";

    for (let i = 0; i <= sanitizedSentence.length; i++) {
        let char = sanitizedSentence[i];

        if (letter != undefined) {
            if (char === letter.toLowerCase()) {
                letterCounter++;
            }
        }
        if (char == ' ' || i == sanitizedSentence.length ) {
            word = sanitizedSentence.slice(startIndex, i);
            if (word.length > 0) {
                wordsCounter++;
                if (word.length > maxLenWord) {
                    maxLenWord = word.length;
                    longestWords = word;
                    longestWordsCounter = 1;
                } else if (word.length === maxLenWord) {
                    longestWords = longestWords.concat(", ", word);
                    longestWordsCounter++;
                }
            }
            startIndex = i + 1;
        }
    }

    console.log(wordsCounter === 1
        ? `There is ${wordsCounter} word in the sentence`
        : `There is ${wordsCounter} words in the sentence`);
    if (letter != undefined) {
        console.log(letterCounter === 1
            ? `There is ${letterCounter} letter "${letter}" in the sentence`
            : `There are ${letterCounter} letters "${letter}" in the sentence`);
    }
    console.log(`Length of the longest word is: ${maxLenWord}.`);
    console.log(longestWordsCounter > 1
        ? `There are ${longestWordsCounter} words of length same as the longest. They are: ${longestWords}.`
        : `There is ${longestWordsCounter} word of length same as the longest. It is: ${longestWords}.`);

/////////////////////// 2nd SOLUTION //////////////////////////

    // let arr = sanitizedSentence.split(" ").filter(word => word.trim() !== "");

    // if (arr.length === 0) {
    //     console.log(`No words in the sentence`);
    //     return;
    // }

    // console.log(arr.length === 1
    //     ? `There is ${arr.length} word in the sentence`
    //     : `There is ${arr.length} words in the sentence`);

    // if (letter != undefined) {
    //     let letterCounter = sanitizedSentence.split(letter.toLowerCase()).length - 1;

    //     console.log(letterCounter === 1
    //         ? `There is ${letterCounter} letter "${letter}" in the sentence`
    //         : `There are ${letterCounter} letters "${letter}" in the sentence`);
    // }

    // let obj = {};
    // for (let word of arr) populateObj(word, obj);
    // const { maxLen } = findMinMax(obj);
    // let maxArr = obj[maxLen];

    // console.log(`Length of the longest word is: ${maxLen}.`);
    // console.log(maxArr.length > 1 
    //     ? `There are ${maxArr.length} words of length same as the longest. They are: ${maxArr.join(', ')}.` 
    //     : `There is ${maxArr.length} word of length same as the longest. It is: ${maxArr.join('')}.`);
}

///////////////////// GENE FINDER //////////////////////////
const findAllGenes = dna => {
    let START_CODON = "atg";
    let END_CODON = "taa";

    let startIndex = dna.indexOf(START_CODON);
    let endIndex = startIndex;
    let counter = 0;
    let obj = {};

    while (startIndex != -1) {
        endIndex = dna.indexOf(END_CODON, endIndex + 3);

        if (endIndex === -1) {
            startIndex = dna.indexOf(START_CODON, startIndex + 3);
            endIndex = startIndex;
            continue;
        }

        let geneCandidate = dna.slice(startIndex, endIndex + 3);

        if (geneCandidate.length % 3 === 0) {
            populateObj(geneCandidate, obj);
            counter++;
            dna = dna.slice(endIndex + 3);
            startIndex = dna.indexOf(START_CODON);
            endIndex = startIndex;
        }
    }

    const { minLen, maxLen } = findMinMax(obj);

    console.log(`Found genes: ${counter}`);
    console.log(`Length of the longest gene: ${maxLen}`);
    console.log(`Length of the shortest gene: ${minLen}`);
}

/////////////////////// MARIO TOWER //////////////////////////
const marioTower = height => {

    for (let i = 1; i <= height; i++) {
        let hashesCount = i;
        let spacesCount = height - i;

        let hashes = "";
        for (let j = 0; j < hashesCount; j++) {
            hashes += "#";
        }

        let spaces = "";
        for (let k = 0; k < spacesCount; k++) {
            spaces += " ";
        }
        console.log(spaces + hashes + " " + hashes);
    }
}

/////////////////////// CREDIT CARD VALIDATOR //////////////////////////
const validateCard = cardNumber => {
    if (typeof cardNumber !== "string") {
        console.log("Input value must a string");
        return;
    }

    if (!luhnCheck(cardNumber)) {
        console.log("INVALID");
        return;
    }

    if ((cardNumber.startsWith("34") || cardNumber.startsWith("37")) && cardNumber.length === 15) {
        console.log("American Express");
    } else if ((cardNumber.startsWith("51")
        || cardNumber.startsWith("52")
        || cardNumber.startsWith("53")
        || cardNumber.startsWith("54")
        || cardNumber.startsWith("55"))
        && cardNumber.length === 16) {
        console.log("Master Card");
    } else if ((cardNumber.startsWith("4")) && (cardNumber.length === 16 || cardNumber.length === 13)) {
        console.log("Visa");
    } else {
        console.log("INVALID");
    }
}

const luhnCheck = value => {
    if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0;
    let bEven = false;
    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) == 0;
}

/////////////////////// helper methods //////////////////////////
const populateObj = (val, obj) => {
    let len = val.length;
    obj[len] = obj[len] || [];
    obj[len].push(val);
}

const findMinMax = obj => {
    let maxLen = -Infinity;
    let minLen = Infinity;
    for (let key in obj) {
        let val = parseInt(key);
        if (val > maxLen) maxLen = val;
        if (val < minLen) minLen = val;
    }
    return { minLen, maxLen };
}

/////////////////////////////////////////////////////////////////

let example1 = "This is an    example  .";
let example2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let example3 = "";

sentenceChecker(example1, "A");
console.log("\n")
sentenceChecker(example2, "   bbn   ");
console.log("\n")
sentenceChecker(example3, "");

console.log("\n")
findAllGenes(dna);

console.log("\n")
marioTower(8);

console.log("\n")
const validCards = [
    "5597507644910558", // valid Mastercard
    "376462280921451",  // valid American Express
    "4916615639346972"  // valid Visa
];

const invalidCards = [
    "4532778771091795", // invalid
    "5795593392134643"  // invalid
];

validCards.forEach(card => validateCard(card));
invalidCards.forEach(card => validateCard(card));