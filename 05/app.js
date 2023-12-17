const axios = require('axios');

// https://api.github.com/users/octocat

const getUser = async (userName) => {
    const url = `https://api.github.com/users/${userName}`;
    const response = await axios.get(url);
    return response.data;
}

getUser('octocat').then(d => console.log(d))