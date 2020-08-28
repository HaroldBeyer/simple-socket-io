
'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8081;

http.listen(PORT, function () {
    console.log('Servidor rodando em: http://localhost:8081');
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('ola', data => {
        console.log('ola', data);
    });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);