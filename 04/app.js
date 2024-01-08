const fs = require('fs').promises;
const axios = require('axios');

const readFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath);
        console.log('File has been read');
        return JSON.parse(data);
    } catch (err) {
        console.log('Error reading the file');
        process.exit(0);
    }
}

const writeToFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
        console.log('File has been saved');
    } catch (err) {
        console.log('Error writing to the file');
        process.exit(0);
    }
}

const getNumberInfo = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log('An issue occurred while connecting to the server');
        process.exit(0);
    }
}

(async () => {
    const filePath = 'data.json';
    try {
        const responseData = await readFromFile(filePath);

        if (responseData?.number == null || responseData?.filename == null) {
            console.log("File read returned incomplete data");
        } else {
            const apiUrl = `https://lukaszuk.net/numbers.php?number=${responseData.number}`;
            const numberInfo = await getNumberInfo(apiUrl);
            await writeToFile(responseData.filename, numberInfo);
        }

    } catch (err) {
        console.log('An error occurred');
    }
})();