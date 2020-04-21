const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors'); // cross origin resource sharing


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// port on which server runs
const PORT = process.env.PORT || 5000;

// for page routing, which isn't necessary in a nextjs framework
const router = require('./router');

const app = express(); // express object
const server = http.createServer(app); // makes http server based on express object
const io = socketio(server); // set up sockets for server

// creates a server-socket endpoint
// as long as socket exists, will check for frontend emits in chat.js
io.on('connection', (socket) => {
    // pass in a callback function in addition to the object
    // callback function is specified in front end, in chat.js
    // as an argument to socket.emit('join', ... ...)
    socket.on('join', (obj, callback) => {
        // error and user are properties of return objects of addUser
        // if the object returned by addUser doesn't have error/user property
        // the variable will be set to null
        const { error, user } = addUser({ id: socket.id, name: obj.name, room: obj.room });
        // logic happens in backend
        console.log(`Adding ${obj.name} to room ${obj.room}`);

        // for example, if addUser doesn't return obj. with the error attribute
        // this if statement will not execute since error is null
        if (error) {
            return (callback(error));
            // pass in anon obj. with property error
            // if there's error, get kicked from function
        }

        // emit event from backend to frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        // broadcasting sends the emission to all other sockets currently joined to user.room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        socket.join(user.room); // connects socket to a room name, VERY important
        
        // the users in the room, emit to everyone
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    // user generated message, emitted from frontEnd
    // emit the message to all sockets in the room
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        // sends the message from one user to all users in the room
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    // when user closes browser window/refresh page
    socket.on('disconnect', () => {
        console.log('User has left!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
        }

        socket.disconnect();
    });
});

app.use(router); // router contains res end support for server
app.use(cors());

// same thing as adding stuff to the class passed to app.use
// express router class
/*
server.on('request', (req, res) => {
    if (req.method === 'GET') {
        console.log("start server");
    }
}); */

// starts the server, listen to requests on port 5000
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});