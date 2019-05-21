// Chat
const mongoose = require('mongoose');
const express = require('express');
const http = require('http').Server(express());
const io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('init', (userId) => {
        sockets[userId.senderId] = socket;
    });
    socket.on('message', (message) => {
        if (sockets[message.receiverId]) {
            sockets[message.receiverId].emit('message', message);
        }
        /* handler for creating message */
    });
    socket.on('disconnect', (userId) => {
        delete sockets[userId.senderId];
    });
});

// mongoose.connect('mongodb://localhost/db/chat');
// https://blog.callstack.io/simple-chat-app-with-react-native-part-i-34d6ea4c2535
// https://blog.callstack.io/simple-chat-app-with-react-native-part-ii-e3d8fd9c6cd4

http.listen(3000, function () {
    console.log('Chat server listening on port 3000');
});