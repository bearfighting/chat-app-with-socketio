const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', (data) => {
        console.log(data);
    });
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
});

server.listen('3700', () => {
    console.log('The server is running on http://localhost:3700');
});