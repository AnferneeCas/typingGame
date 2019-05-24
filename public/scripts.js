const socket = io("http://localhost:3000");
joinRoom("game1");
socket.on("message",function(msg){
    console.log(msg.text);
});