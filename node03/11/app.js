let counter = 0;

const interval = setInterval(() => {
    console.log('Hello');
    counter++;

    if (counter === 5) {
        clearInterval(interval);
        console.log('Finish');
        process.exit(0);
    }
}, 1000);