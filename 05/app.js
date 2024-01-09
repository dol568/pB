const yargs = require("yargs");
const {getUser} = require('./user');
const {getWeather} = require('./weather');
const {getRepos} = require('./repo');

const args = yargs(process.argv)
    .option("login", {
        describe: "GitHub username",
        type: "string",
        demandOption: true,
        string: true
    })
    .option("followers", {
        describe: "Number of users followers",
        type: "boolean",
        boolean: true
    })
    .help()
    .argv;

if (!args.login) {
    console.log('Invalid input for the "login" argument.');
    process.exit(0);
}

const login = args.login;
const followers = args.followers;

printError = (err, firstMsg, secondMsg) => {
    (err.response && err.response.status === 404)
        ? console.error(`${firstMsg}User with login ${login} not found`)
        : console.error(secondMsg);
}

(async (login) => {
    try {
        const user = await getUser(login);

        user?.name != null
            ? console.log(`Username: ${user.name}`)
            : console.error(`Username: Server returned incomplete data or user did not specify a username`);

        (user?.followers != null && followers)
            ? console.log(`Number of followers: ${user.followers}`)
            : null;

        try {
            const repos = await getRepos(login);

            if (repos && repos.length > 0) {
                console.log(`Number of repos: ${repos.length}`);
                console.log(`List of repos names:`);
                repos.forEach((repo, index) => console.log((index + 1) + '. ' + repo.name));
            } else {
                console.log("No repos found");
            }
        } catch (err) {
            printError(err, 'Repos data for ',
                `Error in getting repos data for login ${login} from the server`);
        }

        if (user?.location != null) {
            try {
                const weather = await getWeather(user.location);

                if (weather?.weather[0]?.main == null
                    || weather?.weather[0]?.description == null) {
                    console.log("The weather server returned incomplete data");
                } else {
                    console.log(`Weather for location: ${user.location}`)
                    console.log(`Main: ${weather.weather[0].main}`)
                    console.log(`Description: ${weather.weather[0].description}`)
                }
            } catch (err) {
                printError(err, 'Weather data for ',
                    `Error in getting weather info for location ${user.location} from the server`);
            }
        } else {
            console.error(`Location: Server returned incomplete data or user did not specify a location`);
        }
    } catch (err) {
        printError(err, '',
            `Error occurred while fetching data for the user with login ${login} from the server`);
    }
})(login);
