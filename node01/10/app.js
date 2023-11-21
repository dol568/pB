const math = require('../assets/math');
const fs = require('fs');

function ex10(arg1, arg2) {
    const a = +fs.readFileSync(`${arg1}`);
    const b = +fs.readFileSync(`${arg2}`);

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

ex10(process.argv[2], process.argv[3]);

////////////////////////////////////////////////
// node app.js ../assets/a.txt ../assets/b.txt
