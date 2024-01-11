const fs = require('fs').promises;

const addTodo = async (filePath, data) => {
    try {
        try {
            await fs.access(filePath);
        } catch (err) {
            await fs.writeFile(filePath, JSON.stringify([]), 'utf-8');
        }

        const todosData = await fs.readFile(filePath, 'utf-8');
        const todosJSON = todosData.toString();
        const todos = JSON.parse(todosJSON);

        const isDuplicateTodo = todos.length > 0
            ? todos.find(todo => todo === data)
            : false;

        if (isDuplicateTodo) {
            console.log(`Todo '${data}' already exists`);
        } else {
            todos.push(data);
            await fs.writeFile(filePath, JSON.stringify(todos), 'utf-8');
            console.log(`Todo '${data}' has been added`);
        }

    } catch (err) {
        console.error('Error adding todo to a list');
    }
}

module.exports = {addTodo};
