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

const files = fs.readdirSync(argv.directory);

const obj = files
    .map(name => {
        const filePath = path.join(argv.directory, name);
        const stats = fs.statSync(filePath);
        return {name: name, size: stats.size};
    })

const avg = obj.reduce((acc, el) => {
    return acc + el.size;
}, 0) / files.length;

const filteredAndSorted = obj
    .sort((a, b) => b.size - a.size)
    .filter(el => {
        if (argv.size !== undefined) {
            return el.size > argv.size;
        } else {
            return el.size > avg;
        }
    });

if (argv.size !== undefined) {
    console.table(filteredAndSorted);
} else {
    console.log('mean file size: ' + avg);
    console.table(filteredAndSorted);
}