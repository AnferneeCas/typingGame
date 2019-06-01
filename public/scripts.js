const socket = io("anfer.herokuapp.com");
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

