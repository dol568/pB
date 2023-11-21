const fs = require('fs');

const user = {
    name: 'Jan',
    lastName: 'Nowak'
};

const json = JSON.stringify(user);

fs.writeFileSync('user.json', json, 'utf8');