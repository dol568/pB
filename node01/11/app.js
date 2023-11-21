const math = require('../assets/math');
const fs = require('fs');

function ex11(args) {

    if (args.length > 4) console.log('zbyt dużo parametrów!');
    else if (args.length < 4) console.log('zbyt mało parametrów!');
    else {
        const a = +fs.readFileSync(`${args[2]}`);
        const b = +fs.readFileSync(`${args[3]}`);

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
}

ex11(process.argv);

////////////////////////////////////////////////
// node app.js ../assets/a.txt ../assets/b.txt