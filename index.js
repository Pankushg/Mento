const express = require('express');
const socket = require('socket.io');

const port = 3000;

let app = express();

let server = app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection',(socket)=>{
    console.log('Socket Connection Established : '+socket.id);
    socket.join(['room1'],(err)=>{
        if(err) console.log(err);
        else console.log(`room joined`);
    })
   
    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data);
    });
});