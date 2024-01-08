const fs = require('fs').promises;

const addTodo = async (filePath, data) => {
    try {

        try {
            await fs.access(filePath);
        } catch (err) {
            await fs.writeFile(filePath, JSON.stringify([]));
        }

        const todoBuffer = await fs.readFile(filePath);
        const dataJSON = todoBuffer.toString();
        const todos = JSON.parse(dataJSON);

        const isDuplicateTodo = todos.length > 0
            ? todos.find(todo => todo === data)
            : false;

        if (isDuplicateTodo) {
            console.log(`Todo '${data}' already exists`);
        } else {
            todos.push(data);
            await fs.writeFile(filePath, JSON.stringify(todos));
            console.log("Add new todo");
        }

    } catch (err) {
        console.error('Error writing to the file:', err);
    }
}

module.exports = {addTodo};
