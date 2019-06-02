const socket = io("anfer.herokuapp.com");
var challenge ="";
var room= document.querySelector(".roomNumber").innerText;
console.log("room: "+  room);
joinRoom(room);
socket.on("message",function(msg){
    console.log(msg.text);
});
socket.on("updateChallenge",function(newChallenge){
    
    var paragraph = document.querySelector("#textChallenge");
    paragraph.innerHTML=newChallenge;
    console.log("challenge: "+paragraph.innerHTML);
    challenge=newChallenge;
});

socket.on("win",function(){

    document.querySelector(".banner").style.opacity=1;
    document.querySelector(".bannerText").textContent="WINNER";
    console.log("YOu have won");

});

socket.on("loss",function(){
    document.querySelector(".banner").style.opacity=1;
    document.querySelector(".bannerText").textContent="LOSER";
    document.getElementById("player1").disabled = true;
    console.log("YOu have lost");
});

