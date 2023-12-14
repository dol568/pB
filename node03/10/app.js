const displayMessages = () => {

    const displayMessage = (delay, message) => {
        setTimeout(() => {
            console.log(message)
        }, delay);
    }

    displayMessage(4000, 'Hello after 4 seconds');
    displayMessage(8000, 'Hello after 8 seconds');
}

displayMessages();


