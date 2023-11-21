const fs = require('fs');

function ex12(args) {

    if (args.length > 3) console.log('zbyt dużo parametrów!');
    else if (args.length < 3) console.log('zbyt mało parametrów!');
    else {
        console.log(`Pliki w folderze ${args[2]}`);
        let obj = fs.readdirSync(args[2]);
        obj.forEach(el => console.log(el));
    }
}

ex12(process.argv);

////////////////////////////////////////////////
// node app.js 'C:\\Program Files\\' 