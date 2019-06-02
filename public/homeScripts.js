var buttonJoin = document.querySelector("#button-join")
var buttonCreate = document.querySelector(".buttons");


buttonJoin.addEventListener("click",function(e){
    console.log("hey")
    var buttons = document.querySelector(".buttons")
    
    buttons.classList.toggle("buttons-deactivated");
    
    var joinForm = document.querySelector(".join-form-container")
    joinForm.classList.toggle("join-form-container-activated");

    
}); 