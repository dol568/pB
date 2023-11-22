const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .option('directory', {
        demandOption: true,
        type: 'string'
    })
    .option('size', {
        demandOption: false,
        type: 'number'
    }).argv;

let avg = 0;
const files = fs.readdirSync(argv.directory);

const obj = files
    .map(name => {
        const filePath = path.join(argv.directory, name);
        const stats = fs.statSync(filePath);
        return { name: name, size: stats.size };
    })
    .sort((a, b) => b.size - a.size)
    .filter(el => {
        if (argv.size) {
            return el.size > argv.size;
        } else {
            avg = files.reduce((acc, el) => {
                const filePath = path.join(argv.directory, el);
                const stats = fs.statSync(filePath);
                return acc + stats.size;
            }, 0) / files.length;

            return el.size > avg;
        }
    });

if (argv.size) {
    console.table(obj);
} else {
    console.log('mean file size: ' + avg);
    console.table(obj);
}