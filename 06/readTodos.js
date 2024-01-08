const fs = require('fs').promises;

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        console.log('File has been read');
        return JSON.parse(data);
    }
    catch (err) {
        console.log('Error reading the file');
    }
}

module.exports = {readFile};
