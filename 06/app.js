const yargs = require("yargs");
const {addTodo} = require('./addTodo');
const {readFile} = require('./readTodos');

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
            await addTodo('data.json', argv.todo);
        }
    })
    .command({
        command: 'lista',
        describe: 'Display all todos',
        handler: async () => {
            const todos = await readFile('data.json');
            if (todos != null)
                console.table(todos)
        }
    })
    .demandCommand(1, 'Please provide a command.')
    .help()
    .argv;


