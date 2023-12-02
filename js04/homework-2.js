// Using https://rickandmortyapi.com/api fetch all characters from episode 7.
// documentation can be found here: https://rickandmortyapi.com/documentation/#rest

// RUN npm install IN THIS FOLDER BEFORE RUNNING YOUR CODE!
const fetch = require("node-fetch");

const _API_URL = 'https://rickandmortyapi.com/api'

function getCharactersFromEpisode(episodeNumber) {
    return fetch(`${_API_URL}/episode/${episodeNumber}`)
        .then((response) => {
            if (response.ok === false) {
                throw new Error(`Communication error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((episode) => {
            const characterPromises = episode.characters
                .map((characterUrl) => {
                    return fetch(characterUrl)
                        .then((response) => {
                            if (response.ok === false) {
                                throw new Error(`Communication error! Status: ${response.status}`);
                            }
                            return response.json();
                        });
                });
            return Promise.all(characterPromises);
        });
}

getCharactersFromEpisode(7)
    .then((characters) =>
        characters
            .forEach((character) => console.log(character.name)))
    .catch((error) => console.error(error.message));