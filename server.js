const app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(8081, () => {
    console.log('Servidor socket io na porta 8081');
});

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    })
};

io.sockets.on('connection', (socket) => {
    console.log('connection...');
    socket.on('emit_from_client', (data) => {
        console.log('socket.io server recebe : ' + data);
        io.sockets.emit('emit_from_server', data);
    });

    socket.on('ola', (data) => {
        console.log('Ola: ', data);
    });

    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
});

const net = require('net');

net.createServer((socket) => {
    console.log('socket conectado');
    socket.on('data', function (data) {
        const line = data.toString();
        console.log('got "data"', line);
        io.sockets.emit('emit_from_server', line);
    });
    socket.on('end', function () {
        console.log('end');
    });
    socket.on('close', function () {
        console.log('close');
    });
    socket.on('error', function (e) {
        console.log('error ', e);
    });
    socket.write('ola tcp server');
}).listen(3080, function () {
    console.log('TCP Server na porta 3080');
});