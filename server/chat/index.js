// Chat
const mongoose = require('mongoose');
const express = require('express');
const http = require('http').Server(express());
const socketio = require('socket.io')(http);
const creds = require('../creds.json');

const handlers = require('../chat/handlers')
const User = require('./models/user');

const sockets = {};

socketio.on('connection', (socket) => {
    console.log('connection started')
    socket.on('init', (userId) => {
        console.log(userId)
        sockets[userId.senderId] = socket;
    });
    socket.on('message', (message) => {
        if (sockets[message.receiverId]) {
            console.log(message.receiverId)
            sockets[message.receiverId].emit('message', message);
        }
        handlers.createMessage(message);
    });
    socket.on('disconnect', (userId) => {
        delete sockets[userId.senderId];
    });
});

mongoose.connect(creds.chatDB, { useNewUrlParser: true });
// https://github.com/lukewalczak/friendChat
// https://blog.callstack.io/simple-chat-app-with-react-native-part-i-34d6ea4c2535
// https://blog.callstack.io/simple-chat-app-with-react-native-part-ii-e3d8fd9c6cd4

http.listen(3000, function () {
    console.log('Chat server listening on port 3000');
});