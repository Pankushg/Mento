module.exports.onConnection = (socket, io) =>{
    io.on('connection',(socket)=>{
        console.log('Socket Connection Established : ' + socket.id);
    
        //Joining Room
        socket.on('joinRoom',(data)=>{
            socket.join(data,err=>{
                if(err) throw err;
                else {
                    io.emit('joinRoom',data);
                    console.log(socket.rooms);
                }
            });
        });
    
        //handling messages
        socket.on('chat',(data)=>{
            io.sockets.in(data.handle).emit('chat', data);
        });
    });
}
