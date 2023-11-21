const os = require('os');
const fs = require('fs');

function userInfo() {

    const username = os.userInfo().username;
    fs.writeFileSync('username.txt', username);
}

userInfo();