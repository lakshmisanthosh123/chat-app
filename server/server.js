const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'send_message' events from the client
    socket.on('send_message', (message) => {
        console.log(`Message received from ${message.username}: ${message.text}`);
        
        // Simulate server processing and send a reply
        const serverReply = {
            username: 'Server',
            text: `Hello, ${message.username}. You said: "${message.text}"`,
        };

        // Emit reply only to the sender (client)
        socket.emit('receive_reply', serverReply);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
