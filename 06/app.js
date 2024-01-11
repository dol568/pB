// node app.js dodaj "todo1"
// node app.js lista
// node app.js usun "todo1"

const yargs = require("yargs");
const {addTodo} = require('./addTodo');
const {readTodos} = require('./readTodos');
const {removeTodo} = require("./removeTodo");

const fileName = 'data.json';

yargs
    .command({
        command: 'dodaj [todo]',
        describe: 'Add new todo to a list',
        builder: (yargs) => {
            yargs.positional('todo', {
                describe: 'Todo content',
                type: 'string',
                demandOption: true
            });
        },
        handler: async (argv) => {
            !argv.todo
                ? console.log("Invalid input for the 'todo' argument.")
                : await addTodo(fileName, argv.todo);
        }
    })
    .command({
        command: 'lista',
        describe: 'Display all todos',
        handler: async () => {
            const todos = await readTodos(fileName);
            todos?.length > 0
                ? console.table(todos)
                : console.log("List is empty")
        }
    })
    .command({
        command: 'usun [todo]',
        describe: 'Remove todo from a list',
        builder: (yargs) => {
            yargs.positional('todo', {
                describe: 'Todo content',
                type: 'string',
                demandOption: true
            });
        },
        handler: async (argv) => {
            !argv.todo
                ? console.log("Invalid input for the 'todo' argument.")
                : await removeTodo(fileName, argv.todo);
        }
    })
    .demandCommand(1, 'Please provide a command.')
    .help()
    .argv;
