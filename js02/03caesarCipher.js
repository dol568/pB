function createAlphabet() {
    return "abcdefghijklmnopqrstuvwxyz";
}

function shiftAlphabet(alphabet, shift) {
    const shiftedAlphabet = [...alphabet];
    for (let i = 0; i < alphabet.length; i++) {
        let offset = (i + shift) % alphabet.length;
        shiftedAlphabet[i] = alphabet[offset];
    }
    return shiftedAlphabet;
}

function isAlphabeticString(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function transformMessage(message, shift) {
    const alphabet = createAlphabet();
    const shiftedAlphabet = shiftAlphabet(alphabet, shift);

    let result = '';
    message = message.toLowerCase();

    for (let i = 0; i < message.length; i++) {
        let index = alphabet.indexOf(message[i]);
        result = result.concat(shiftedAlphabet[index]);
    }
    return result;
}

function encode(message, val) {
    if (!isAlphabeticString(message)) {
        return "Invalid input. Only letters are allowed for encoding";
    }
    return transformMessage(message, val);
}

function decode(message, val) {
    if (!isAlphabeticString(message)) {
        return "Invalid input. Only letters are allowed for decoding";
    }
    return transformMessage(message, -val);
}

module.exports = { encode, decode };