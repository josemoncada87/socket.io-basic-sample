// Code to create a simple server that listens for incoming connections and messages
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

// Create a new express application
const app = express();
// Create a new http server using the express app
const server = http.createServer(app);
// Create a new socket.io server using the http server
const io = socketIO(server, /*{
  // Allow CORS for the socket.io server
  // This is necessary if the client is running on a different machine
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
}*/);

// Enable CORS for all requests
app.use(cors());
// Parse incoming requests with JSON payloads
app.use(express.json())
// Serve the public directory as a static file directory
app.use('/app', express.static('public'));

// Handle incoming connections
// When a client connects to the server, the callback function is called
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle custom event 'message'
  socket.on('message', (data) => {
    // Show message at server console
    console.log('Received message:', data);
    // Send a response back to the client
    socket.emit('response', 'received: ' +  data);
  });
});

// Define the port to run the server on
const port = 3000;
// Start the server on port 3000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});