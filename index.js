const express = require('express');
const socket = require('socket.io');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const register = require('./routes/register');
const users = require('./routes/users');
const chats = require('./routes/chats');
const socketHandle = require('./socket');
const config = require('./config/db');

const port = 3000;

let app = express();

let server = app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
});

//app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Cross Origin Access
app.use(cors());

app.use('/register',register);
app.use('/users',users);
app.use('/chats',chats);

//Database connection
mongoose.connect(config.database,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{
    console.log('Connected to Database : ' + config.database)
});

//Socket Connection Handling
let io = socket(server);
socketHandle.onConnection(socket, io);