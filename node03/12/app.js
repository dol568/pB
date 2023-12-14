let counter = 1;
const displayMessage = () => {
    setTimeout(() => {
        console.log(`Hello World ${counter}`)
        counter++;
        displayMessage();
    }, counter * 1000)
}

displayMessage();
