const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .option('file', {
        demandOption: true,
        type: 'string'
    }).argv;

const stats = fs.statSync(argv.file);
const obj = {size: stats.size, birthTime: stats.birthtime, modificationTime: stats.mtime};

console.log(`Birth Time: ${obj.birthTime}\nModification Time: ${obj.modificationTime}\nSize: ${obj.size} bytes`);

