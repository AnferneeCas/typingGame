const socket = io("anfer.herokuapp.com/socket.io/?EIO=4&transport=websocket");
var challenge ="";
joinRoom("game1");
socket.on("message",function(msg){
    console.log(msg.text);
});
socket.on("updateChallenge",function(newChallenge){
    
    var paragraph = document.querySelector("#textChallenge");
    paragraph.innerHTML=newChallenge;
    console.log(paragraph.innerHTML);
    challenge=newChallenge;
});

socket.on("win",function(){
    var banner= document.querySelector(".bannerWinner");
    banner.setAttribute("style","visibility: visible;")
    console.log("YOu have won");
});

socket.on("loss",function(){
    var banner= document.querySelector(".bannerLoser");
    banner.setAttribute("style","visibility: visible;")
    document.getElementById("player1").disabled = true;
    console.log("YOu have lost");
});

