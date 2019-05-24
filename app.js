var express = require('express');
var app = express();
var socketio = require("socket.io");
var rooms=[{
    game1: "Spicy jalapeno spare ribs pork proident est. Consequat pancetta aliqua sint, nostrud capicola do. Spare ribs labore swine ribeye filet mignon ham hock nulla biltong meatloaf ut ea est aute chicken. Swine velit pancetta ex fugiat non ham beef flank shoulder officia pork loin short ribs buffalo. Meatloaf picanha enim, fatback id ullamco eiusmod ground round cow burgdoggen et flank laborum. Kielbasa shankle pariatur aute, tempor ad frankfurter commodo strip steak ball tip salami in. Do boudin turducken consectetur ut id.",
    game2: "In alcatra dolore, leberkas veniam pig cillum sirloin esse voluptate meatball non lorem. Labore flank exercitation jerky kevin pancetta ut in in deserunt aliqua swine ullamco velit strip steak. Est pastrami ham tri-tip bresaola ham hock. Burgdoggen t-bone nulla cow, tenderloin nisi quis incididunt drumstick reprehenderit labore do cillum flank pork belly. Buffalo t-bone kielbasa jerky, tongue pork loin non laboris in turducken tenderloin. Aute pork chop biltong turducken chicken capicola minim.",
    game3: "Quis hamburger meatball burgdoggen. Leberkas dolore tail fatback andouille aliquip eiusmod ut ground round. In venison pork loin boudin pastrami incididunt. Frankfurter occaecat doner aute sausage. Chicken beef ribs est voluptate exercitation pig t-bone pork chop frankfurter capicola strip steak shoulder aliquip. Ut turducken esse frankfurter short ribs laboris."
}]
app.use(express.static(__dirname+'/public'));

const expressServer = app.listen(3000);
const io = socketio(expressServer);


io.on('connection',function(socket){
    console.log("user connected");
    socket.on("joinRoom",function(roomToJoin){
        socket.join(roomToJoin);
    });
     io.emit("message",{
         text: "hey"
     });
     socket.on('inputChange',function(change){
        socket.broadcast.emit('newChange',change);
     }) ; 
});

