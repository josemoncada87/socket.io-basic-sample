// This file is the client side code that will run in the browser
// Use this line if you are running the server on a different machine
// let socket = io("http://127.0.0.1:3000")

// Code to create a simple client that connects to the server and sends messages
// working on same server use as static file server
let socket = io();
console.log({socket});

socket.on('connect', () => {
    console.log('Connected to server');
    // Send a message to the server
    socket.emit('message', 'Hello from client');

    socket.on('response', (data) => {
        console.log('Server says:', data);
    });

    // Send a message to the server every 5 seconds
    let timer = 0;
    setInterval(() => {
        socket.emit('message', 'Hello from client on timer: ' + timer);
        timer += 5;
    }, 5000);
});