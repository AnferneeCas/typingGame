var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.set('view engine', 'ejs');
var port = process.env.PORT||3000;
var socketio = require("socket.io");
var rooms=[
    {challenge: "Spicy jalapeno spare ribs pork proident est. Consequat pancetta aliqua sint, nostrud capicola do. Spare ribs labore swine ribeye filet mignon ham hock nulla biltong meatloaf ut ea est aute chicken. Swine velit pancetta ex fugiat non ham beef flank shoulder officia pork loin short ribs buffalo. Meatloaf picanha enim, fatback id ullamco eiusmod ground round cow burgdoggen et flank laborum. Kielbasa shankle pariatur aute, tempor ad frankfurter commodo strip steak ball tip salami in. Do boudin turducken consectetur ut id.",gameId:[]},
    {challenge: "In alcatra dolore, leberkas veniam pig cillum sirloin esse voluptate meatball non lorem. Labore flank exercitation jerky kevin pancetta ut in in deserunt aliqua swine ullamco velit strip steak. Est pastrami ham tri-tip bresaola ham hock. Burgdoggen t-bone nulla cow, tenderloin nisi quis incididunt drumstick reprehenderit labore do cillum flank pork belly. Buffalo t-bone kielbasa jerky, tongue pork loin non laboris in turducken tenderloin. Aute pork chop biltong turducken chicken capicola minim.",gameId:[]},
    {challenge: "Quis hamburger meatball burgdoggen. Leberkas dolore tail fatback andouille aliquip eiusmod ut ground round. In venison pork loin boudin pastrami incididunt. Frankfurter occaecat doner aute sausage. Chicken beef ribs est voluptate exercitation pig t-bone pork chop frankfurter capicola strip steak shoulder aliquip. Ut turducken esse frankfurter short ribs laboris.",gameId:[]}
]
//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.get("/",function(req,res){
    res.render(__dirname + '/public/home.ejs');
})

app.post("/play",function(req,res){
    var user= {
         username:req.body.username,
        roomNumber: req.body.roomNumber
    }
    
    res.render(__dirname + '/public/index.ejs',{user:user});
})

const expressServer = app.listen(port);
const io = socketio(expressServer);


io.on('connection',function(socket){
    console.log("user connected"+ socket.id);
    socket.on("disconnecting",function(){
        const roomTitle = Object.keys(socket.rooms)[0];
        var roomPlayer = io.sockets.adapter.rooms[roomTitle].length;
        if(roomPlayer <=1)
        {
            rooms.forEach(element => {
                for (var i=element.gameId.length-1; i>=0; i--) {
                    if (element.gameId[i].room === roomTitle) {
                        element.gameId.splice(i, 1);
                         break;       //<-- Uncomment  if only the first term has to be removed
                    }
                }
            });
        }else{
            rooms.forEach(function(e){
                e.gameId.forEach(function(ee){
                    if(ee.room==roomTitle){
                        for(var i= ee.player.length-1;i>=0;i--){
                            if(ee.player[i].sockedId==socket.id){
                                ee.player.splice(i,1);
                                io.to(roomTitle).emit("newPlayer",ee.player);
                            }
                        }
                          
                          
                    }
                });
            })
        }
       console.log(rooms);
        
    })
    socket.on("joinRoom",function(roomToJoin,username){
        socket.join(roomToJoin);
        var room = io.sockets.adapter.rooms[roomToJoin].length;
        
        if(room==1)
        {
            console.log(username);
            var gameData={room:roomToJoin,
                player:[{sockedId:socket.id,username:username}]};
            var challengeNumber= Math.floor(Math.random()*3);
            console.log("challenger numbeR: "+challengeNumber);
            socket.emit("updateChallenge",rooms[challengeNumber].challenge);
            rooms[challengeNumber].gameId.push(gameData);

            
        }
        else{
            rooms.forEach(function(e){
                e.gameId.forEach(function(ee){
                    if(ee.room==roomToJoin)
                    {
                        ee.player.push({sockedId:socket.id,username:username});
                        socket.emit("updateChallenge",e.challenge); 
                        console.log(ee.player);
                        
                    }
                });
            })
        }


        rooms.forEach(function(e){
            e.gameId.forEach(function(ee){
                if(ee.room==roomToJoin){
                    io.to(roomToJoin).emit("newPlayer",ee.player);  
                    console.log("players: "+ee.player);   
                }
            });
        })
        console.log("Users in room: "+ room);
        //console.log(socket.rooms);
        
        
                   
    });
     io.emit("message",{
         text: "hey"
     });
     socket.on('inputChange',function(change,challenge){
         console.log(socket.rooms);
        const roomTitle = Object.keys(socket.rooms)[0];
        console.log(roomTitle);
        socket.broadcast.to(roomTitle).emit('newChange',change);
        var win=true;
        for(var i=0;i<=challenge.length;i++)
        {
            if(change[i]!=challenge[i])
                win=false;
        }
        if(win)
        {
            socket.emit("win");
            socket.broadcast.emit('loss');
        }
           

     }) ; 
});

