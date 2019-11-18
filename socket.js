module.exports.onConnection = (socket, io) =>{
    io.on('connection',(socket)=>{
        console.log('Socket Connection Established : ' + socket.id);
    
        //Handle knocks
        socket.on('knocKnock',(data)=>{
            console.log(socket.rooms);
            socket.join(data,err=>{
                if(err) throw err;
                else {
                    io.sockets.in(data).emit('knocKnock',"hello");
                    console.log(socket.rooms);
                }
            });
        });

        //Ready Room
        socket.on('readyRoom',(data)=>{
            console.log(socket);
            console.log(data);
            socket.join(data,err=>{
                if(err) throw err;
                else {
                    io.emit('roomReady',data);
                }
            });
        });
        
    
        //handling messages
        socket.on('chat',(data)=>{
            io.sockets.in(data.handle).emit('chat', data);
        });
    });
}
