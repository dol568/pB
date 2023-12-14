const request = require('request');

const correctStatusCode = 200;

const getUser = (id, callback) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request(url, (error, response, body) => {
        if (!error) {
            if (response.statusCode === correctStatusCode) {
                let user;
                try {
                    user = JSON.parse(body);
                    callback(user);
                } catch (err) {
                    console.log("serwer użytkowników zwrócił niepoprawnego JSONa");
                    process.exit(0);
                }
            } else {
                console.log('nie znaleziono użytkownika o id: ' + id);
            }
        } else {
            console.log('wystąpił problem z połączeniem do serwera uzytkowników');
        }
    });
}

module.exports = {getUser};