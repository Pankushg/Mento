const express = require('express');
const socket = require('socket.io');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const register = require('./routes/register')

const port = 3000;

let app = express();

let server = app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
});

//app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Cross Origin Access
app.use(cors());

app.use('/register',register);

//Socket Connection Handling
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