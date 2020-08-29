const client = require('socket.io-client')
const socket = client.connect('http://localhost:8081');

// const socket = client.connect('http://localhost:3000')

socket.on('connect', () => {
    console.log("Connected");
    socket.on('time', (time) => {
        console.log('Time: ', time);
    });
    let a = 0;
    setInterval(() => {
        socket.emit('ola', { a });
        a++;
    }, 1000);
});