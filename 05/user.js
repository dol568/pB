const axios = require('axios');

const getUser = async (login) => {
    const url = `https://api.github.com/users/${login}`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {getUser};



