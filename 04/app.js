const fs = require('fs');
const axios = require('axios');

fs.readFile('data.json', 'utf-8', function(err, ele) {
    const resp = JSON.parse(ele);
    const url = `https://lukaszuk.net/numbers.php?number=${resp.number}`;
    return axios.get(url).then(response => {
        fs.writeFile(resp.filename, response.data, err => {
            if (err) {
                console.log(err)
            }
        })
    })
})