const express = require("express"),
      http_PORT = process.env.PORT || 3004,
      http = require("http"),
      path = require("path"),
      pathName = path.join(__dirname, "../public"),
      app = express(),
      socketIO = require("socket.io"),
      server = http.createServer(app),
      io = socketIO(server),
      {generateMessage,generateLocationMessage} = require("./utils/message.js"),
      moment = require("moment");

let numberOfUsers = 0;

app.use(express.static(pathName));

io.on("connection", function (socket) {
    console.log("new user connected");
    numberOfUsers++;
    console.log(`currently there are ${numberOfUsers} users`);
    //server side EMITS newMessageEvent and client side EMITS createMessageEvent

    //WElCOME MESSAGE FROM SERVER to the user who just logged in
    socket.emit("newMessageEvent", generateMessage("admin","welcome to the chat room"));

    //WElCOME MESSAGE FROM SERVER to all the other users notifying them that a new user has connected
    socket.broadcast.emit("newMessageEvent", generateMessage("admin", "A new user just joined"));

    socket.on("disconnect", function () {
        console.log("User disconnected from server");
        numberOfUsers--;
        console.log(`currently there are ${numberOfUsers} users`);
    });




    //new EMAIL EVENTS
    // socket.emit("newEmail", {
    //     "from": "peshotan irani",
    //     subject: "cool bro"
    // });
    //
    // socket.on("createEmail", (substance)=>{
    //     console.log(`currently ${substance.name} just joined`);
    // });





    //NEW MESSAGE AND CREATE MESSAGE
    // socket.emit("newMessageEvent", {
    //     from: "Peshotan Irani",
    //     text: "good morning folks, how is everyone???",
    //     createdAt: Date.now().toLocaleString()
    //     }
    // );

    socket.on("createMessageEvent", (message, callbackfunction)=>{
        console.log(`${message.from} + "says " + ${message.text}` );
        io.emit("newMessageEvent", generateMessage(message.from, message.text));
        callbackfunction("Hi this is the server");// this is to emit a message to all users
    });


    //LOCATION MESSAGES

    socket.on("createLocationMessage", (locationData, callbackfunction)=> {
        console.log("Message recived");
        io.emit("newLocationMessage", generateLocationMessage("admin", locationData));
        callbackfunction("Server received your location")
    });


});

server.listen(http_PORT, function() {
    console.log(`Server is up on ${http_PORT}`)
});


