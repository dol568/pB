const yargs = require('yargs').argv;

console.log('Wynik: ' + eval(`${yargs.a}${yargs.operator}${yargs.b}`));