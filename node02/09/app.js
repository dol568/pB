const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
    .option('directory', {
        demandOption: true,
        type: 'string'
    })
    .option('size', {
        demandOption: false,
        type: 'number'
    }).argv;

let obj = fs.readdirSync(argv.directory).map(el => {
    const stats = fs.statSync(el);
    return { el: el, size: stats}
}).sort((a, b) => b.size - a.size)

// if (argv.size) {
//     obj = obj.filter(el => el.size > argv.size)
// }

console.log(obj)

// obj.forEach(el => console.log(el));