const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .option('file', {
        describe: "Path to file",
        demandOption: true,
        type: 'string'
    })
    .help()
    .argv;

if (!argv.file) {
    console.log('Invalid input for the "file" argument.');
    process.exit(1);
}

const file = argv.file;

try {
    const stats = fs.statSync(file);
    const obj = {size: stats.size, birthTime: stats.birthtime, modificationTime: stats.mtime};

    const tableData = [
        {Attribute: 'Birth Time', Value: obj.birthTime},
        {Attribute: 'Modification Time', Value: obj.modificationTime},
        {Attribute: 'Size', Value: `${obj.size} bytes`}
    ];

    console.table(tableData);
} catch (err) {
    console.error(`File '${file}' does not exist`);
}
