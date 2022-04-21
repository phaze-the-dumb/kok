// Imports
const express = require('express');
const WebSocket = require('ws');
const cookies = require('cookie-parser');

// Global Classes
const User = require('./classes/users');

// Global Variables
let connections = [];

// WebServer Application
const app = express();
app.use(cookies());

// WebSocket Application
const server = new WebSocket.Server({ port: 8080 });
server.on('connection', ( socket ) => {
    let sData = new User(socket)
    connections.push(sData);

    socket.on('message', ( msg ) => {
        msg = msg.toString().split(',');

        if(msg[0] === 'draw'){
            connections.forEach(c => {
                c.socket.send('draw,'+msg[4]+','+msg[5]+','+msg[1]+','+msg[2]+','+msg[3]+','+msg[6])
            })
        }
    })

    socket.on('close', () => {
        connections = connections.filter(x => sData.id !== x.id);
    })
})

app.use((req, res) => {
    res.sendFile(__dirname+'/draw.html');
})

app.listen(80)