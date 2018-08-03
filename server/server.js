const express = require("express"),
      http_PORT = process.env.PORT || 3004,
      http = require("http"),
      path = require("path"),
      pathName = path.join(__dirname, "../public"),
      app = express(),
      socketIO = require("socket.io"),
      server = http.createServer(app),
      io = socketIO(server);


let numberOfUsers = 0;

app.use(express.static(pathName));

io.on("connection", function (socket) {
    console.log("new user connected");
    numberOfUsers++;
    console.log(`currently there are ${numberOfUsers} users`);

    socket.on("disconnect", function () {
        console.log("User disconnected from server");
        numberOfUsers--;
        console.log(`currently there are ${numberOfUsers} users`);
    });

    socket.emit("newEmail", {
        "from": "peshotan irani",
        subject: "cool bro"
    });

    socket.on("createEmail", (substance)=>{
        console.log(`currently ${substance.name} just joined`);
    });

    socket.emit("newMessageEvent", {
        from: "Peshotan Irani",
        text: "good morning folks, how is everyone???",
        createdAt: Date.now().toLocaleString()
        }
    );

    socket.on("createMessageEvent", (message)=>{
        console.log(`${message.from} + "says " + ${message.text}` );

        socket.emit("newMessageEvent", message) // this is to emit a message from one user to all users
    });
});

server.listen(http_PORT, function() {
    console.log(`Server is up on ${http_PORT}`)
});


