// node colors.js --sentence=123456789
// node colors.js --sentence=123456789 --style=rainbow
// node colors.js --sentence=123456789 --style=zebra

const colors = require('colors/safe');
const yargs = require('yargs');

const argv = yargs
    .option('sentence', {
        describe: "Sentence to be colored",
        demandOption: true,
        type: 'string',
    })
    .option('style', {
        describe: "Type of coloring",
        type: 'string',
        choices: ['rainbow', 'zebra', 'america', 'trap', 'random']
    })
    .help()
    .argv;

if (!argv.sentence) {
    console.log("Invalid input for the 'sentence' argument.");
    process.exit(0);
}

const sentence = argv.sentence;
const style = argv.style;

switch (style) {
    case 'rainbow':
        console.log(colors.rainbow(sentence));
        break;
    case 'zebra':
        console.log(colors.zebra(sentence));
        break;
    case 'america':
        console.log(colors.america(sentence));
        break;
    case 'trap':
        console.log(colors.trap(sentence));
        break;
    case 'random':
        console.log(colors.random(sentence));
        break;
    default:
        console.log(colors.rainbow(sentence));
}


