const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
    .option('name', {
        alias: 'n',
        describe: 'User name',
        demandOption: true,
        type: 'string'
    })
    .option('lastName', {
        alias: 'l',
        describe: 'User Lastname',
        demandOption: true,
        type: 'string'
    }).argv;

const user = {
    name: argv.name,
    lastName: argv.lastName
};

const json = JSON.stringify(user);

fs.writeFileSync('user.json', json, 'utf8');