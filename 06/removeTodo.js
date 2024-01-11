const fs = require('fs').promises;
const {readTodos} = require("./readTodos");

const removeTodo = async (filePath, data) => {
    try {
        let todos = await readTodos(filePath);

        if (todos.find(todo => todo === data)) {

            todos = todos.filter(todo => todo !== data);

            await fs.writeFile(filePath, JSON.stringify(todos), 'utf-8');
            console.log(`Todo '${data}' has been removed`);
        } else {
            console.log(`Todo '${data}' not found in the list`);
        }
    } catch (err) {
        console.error('Error removing todo from a list');
    }
}

module.exports = {removeTodo};