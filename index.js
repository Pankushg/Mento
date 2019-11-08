const express = require('express');
const socket = require('socket.io');

const port = 3000;

let app = express();

let server = app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
});

//app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/');
})

let io = socket(server);

io.on('connection',(socket)=>{
    console.log('Socket Connection Established : ' + socket.id);
    socket.on('joinRoom',(data)=>{
        socket.join(data.handle,err=>{
            if(err) throw err;
            else {io.emit('joinRoom',data);}
            console.log(socket.rooms);
        });
    });

    socket.on('chat',(data)=>{
        io.sockets.in(data.handle).emit('chat', data);
    });
});