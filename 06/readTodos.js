const fs = require('fs').promises;

const readTodos = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        console.log('File with todos has been read');
        return JSON.parse(data);
    }
    catch (err) {
        console.log('Error reading todos from file');
        process.exit(0);
    }
}

module.exports = {readTodos};
