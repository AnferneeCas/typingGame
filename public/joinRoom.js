function joinRoom(roomName){
    socket.emit("joinRoom",roomName);

    var textArea = document.querySelector("#player1");
    textArea.addEventListener('input',function(e){
        socket.emit('inputChange',e.target.value);
    })
    
    socket.on('newChange',function(newChange){
        var textArea2 = document.querySelector('#player2');
        textArea2.value = newChange;
    })
}