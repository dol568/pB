const films = require("./sw-films.json");
const planets = require("./sw-planets.json");
const people2 = require("./sw-people.json");
const starships = require("./sw-starships.json");

// count sum of all starships cost from episodes 4-6
console.log(
    "Sum of all starships cost from episodes 4 - 6 is: " +
    sumAllStarshipsCostFromEpisodes(4, 6)
);

function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
    let sum = 0;
    starships
        .filter((starship) => {
            return /^[0-9]+$/.test(starship.cost_in_credits);
        })
        .map(starship => starship.films.map(filmId => ({ starship, filmId })))
        .flat()
        .forEach(({ starship, filmId }) => {
            const episodeId =  filmId
                .replace("https://swapi.dev/api/films/", "")
                .replace("/", "");
            if (+episodeId >= startEp && +episodeId <= endEp) {
                sum += parseInt(starship.cost_in_credits);
            }
        });
    return sum;
}

// find the fastest starship you can afford having 8500000 credits

console.log(
    "Fastest ship I can get for up to 8500000 is: " +
    getFastestShipFor(8500000).name
);


function getFastestShipFor(money) {
    let ship = starships
        .filter((starship) => {
            return /^[0-9]+$/.test(starship.cost_in_credits);
        })
        .filter((starship) => {
            return starship.cost_in_credits <= money;
        })
        .sort((a, b) => a.max_atmosphering_speed - b.max_atmosphering_speed)[0];
    return ship;
}

// find planet name with the lowest difference between the rotation period and orbital period

console.log(
    "Planet name with the lowest difference between the rotation period and orbital period is: " +
    getPlanetNameWithLowestDifference("rotation_period", "orbital_period")
);

function getPlanetNameWithLowestDifference(key1, key2) {
    let planetName;
    planetName = planets
        .filter((value) => {
            return /^[0-9]+$/.test(value[key1]) || /^[0-9]+$/.test(value[key2]);
        }).filter((value) => {
            return value[key1] > 0 || value[key2] > 0;
        })
        .map(value => {
            let diff = Math.abs(value[key2] - value[key1]);
            return {diff, res: value.name}
        })
        .sort((a, b) => a.diff - b.diff)[0].res;
    return planetName;
}

// map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
    "Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: " +
    getCrewShipFrom(4, new Date(2014, 11, 10), new Date(2014, 11, 12)).length
);

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
    let ship;
    ship = starships
        .filter((starship) => {
            let crewFormatted = starship.crew.replace(/[.,-]/g, '');
            return /^[0-9]+$/.test(crewFormatted)
                && crewFormatted <= maxCrew
                && (new Date(starship.created).getTime() < dateEnd.getTime())
                && (new Date(starship.created).getTime() > dateStart.getTime())
        }).map((starship) => {
            return {
                crew: starship.crew,
                created: new Date(starship.created)
            }
        })
    return ship;
}

// create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high

console.log(
    // "People from ep 1 - 5 sorted by origin planet diameter low to high: " +
    getPeopleSortedByOriginPlanetDiameter(1, 5)
);

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {
    let people;
    people = Array.from(new Set(films
        .filter(film => film.episode_id >= startEp && film.episode_id <= endEp)
        .map(film => film.characters)
        .flat()
        .map(characterUrl => people2.find(person => person.url === characterUrl))
        .filter(person => person !== undefined && person !== null)
        .map(person => {
            const planet = planets.find(planet => planet.url === person.homeworld);
            if (planet.diameter > 0 || /^[0-9]+$/.test(planet.diameter)) {

            return {
                name: person.name,
                diameter: planet.diameter
            }
            }
        })

        .sort((a, b) => b.diameter - a.diameter)
));
            // return Array.from(new Set(result))

    return people;
}
