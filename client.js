// const io = require('socket.io-client');


// // const socket = io('http://localhost', { port: 8081 });

// const socket = io({ host: 'http://localhost', port: 8081 })

//     socket.connect().on('time', (time) => {
//         console.log('Time: ', time);
//     })

// socket.on('connection', (_socket) => {
//     console.log("Connected");
//     _socket.on('time', (time) => {
//         console.log('Time: ', time);
//     });

//     setInterval(() => {
//         socket.emit('ola', { a });
//         a++;
//     }, 1000);

// })

// client side
const client = require('socket.io-client')
const socket = client.connect('http://localhost:8081')

socket.on('connect', () => {
    socket.on('time', (time) => {
        console.log('Time: ', time);
    });
    let a = 0;
    setInterval(() => {
        socket.emit('ola', { a });
        a++;
    }, 1000);
});

// socket.on('time', (timeString) => {
//     console.log("Time: ", timeString);
// })

// let a = 0;
