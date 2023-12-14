// node app.js --id=3
const argv = require('yargs').argv;
const fs = require('fs');
const {getUser} = require('./user');
const {getWeather} = require('./weather');

if (argv.id == null
    || !Number.isInteger(argv.id)
    || argv.id < 0) {
    console.log('nieprawidłowy parametr wywołania');
    process.exit(0);
}

const userId = argv.id;
const fileName = 'user.json';

getUser(userId, (user) => {

        if (user?.name == null
            || user?.address?.geo?.lat == null
            || user?.address?.geo?.lng == null) {
            console.log("serwer użytkowników zwrócił niekompletne dane");
        } else {
            console.log(`użytkownik ${user.name}`);
            console.log(`lat ${user.address.geo.lat}`);
            console.log(`lng ${user.address.geo.lng}`);
        }
        getWeather(user.address.geo.lat, user.address.geo.lng, (weather) => {
            console.log(weather.main.temp);

            const userData = {username: user.name, temperature: weather.main.temp};
            const toJson = JSON.stringify(userData);

            fs.writeFile(fileName, toJson, error => {
                error ? console.log('blad zapisu do pliku') : console.log('plik zostal zapisany');
            })
        });
    }
);