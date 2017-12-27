const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')

const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New connection");

    socket.on('disconnect', () => {
        console.log('User was Disconnected to server');
    });



    socket.on('createMessage', (message) => {
        console.log('Create Message ->', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});



app.get('/', (req, res) => {
    res.send();
});
server.listen(port, () => {
    console.log(`Server is working in port  ${port}`);
});