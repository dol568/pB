const axios = require('axios');

const getRepos = async (login) => {
    const url = `https://api.github.com/users/${login}/repos`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {getRepos};