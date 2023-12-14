const request = require('request');

const correctStatusCode = 200;

const getWeather = (lat, lng, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    request(url, (error, response, body) => {
        if (!error) {
            if (response.statusCode === correctStatusCode) {
                let weatherData;
                try {
                    weatherData = JSON.parse(body);
                    callback(weatherData);
                } catch (err) {
                    console.log("serwer pogody zwrócił niepoprawnego JSONa");
                    process.exit(0);
                }

                if (weatherData?.weather[0]?.description) {
                    console.log(`aktualna pogoda to: ${weatherData.weather[0].description}`);
                } else {
                    console.log("serwer pogody zwrócił niekompletne dane");
                }

            } else {
                console.log(`nie znaleziono pogody dla koordynatów lat=${lat} lon=${lng}`);
            }
        } else {
            console.log('wystąpił problem z połączeniem do serwera pogody');
        }
    });
}

module.exports = {getWeather};