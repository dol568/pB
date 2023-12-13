// node app.js --id=3
const argv = require('yargs').argv;
const fs = require('fs');
const {getUser} = require('./user');
const {getWeather} = require('./weather')
const fileName = 'userwe.json';
const userId = argv.id;

getUser(userId, (user) => {
    console.log(user.name);
    console.log('lat', user.address.geo.lat);
    console.log('lng', user.address.geo.lng);
    getWeather(user.address.geo.lat, user.address.geo.lng, (weather) => {
        console.log(weather.main.temp);
        const userData = {username: user.name, temperature: weather.main.temp};
        const toJson = JSON.stringify(userData);
        fs.writeFile(fileName, toJson, error => {
            error ? console.log('blad zapisu do pliku') : console.log('plik zostal zapisany');

        })
    });
});