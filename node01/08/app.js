const math = require('../assets/math');
const fs = require('fs');

function ex08() {
    const a = +fs.readFileSync('../assets/a.txt');
    const b = +fs.readFileSync('../assets/b.txt');

    const operations = {
        add: 'Dodawanie',
        sub: 'Odejmowanie',
        mul: 'Mnozenie',
        div: 'Dzielenie'
    };

    Object.keys(operations).forEach(op => {
        const res = `${operations[op]} liczb ${a} i ${b} daje w wyniku ${math[op](a, b)}`;
        fs.appendFileSync('wynik.txt', res + '\n');
    });
}

ex08();