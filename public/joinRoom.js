function joinRoom(roomName){
    socket.emit("joinRoom",roomName);

    var textArea = document.querySelector("#player1");
    textArea.addEventListener('input',function(e){
        socket.emit('inputChange',e.target.value,challenge);
        checkChallenge(e.target.value);
    })

    textArea.addEventListener('paste',function(e){
      //  e.preventDefault();
        console.log("no paste permitted");
    })
    
    socket.on('newChange',function(newChange){
        var textArea2 = document.querySelector('#player2');
        textArea2.value = newChange;
        textArea2.scrollTop = textArea2.scrollHeight;
    })
}

function checkChallenge(input){

    var paragraph = document.querySelector("#textChallenge");
    var result="";
    var partition="";
    for(var i = 0;i<input.length;i++){
        if(input[i]==challenge[i])
        {
            result+=challenge[i];
        }else{
            break;
        }
    }
   
      paragraph.innerHTML= `<span class="correctChar">${result}</span>${splitValue(challenge,result.length)}`;

      console.log(paragraph.textContent);
   }      
   
  
   function splitValue(value, index) {
    value.substring(0, index)
    return value.substring(index);
}

