let socket = io('http://localhost:3000');

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    room = document.getElementById('room');
    alerts = document.getElementById('alerts');

room.addEventListener('click', function(){
    socket.emit('joinRoom',{
        handle : handle.value
    });
});

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
    message.value = "";
});

socket.on('chat', (data)=>{
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    alerts.innerHTML='';
});

socket.on('joinRoom', (data)=>{
    alerts.innerHTML += '<p>user joined : ' + data.handle + '</p>';
});