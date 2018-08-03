const express = require("express"),
      http_PORT = process.env.PORT || 3004,
      http = require("http"),
      path = require("path"),
      pathName = path.join(__dirname, "../public"),
      app = express(),
      socketIO = require("socket.io"),
      server = http.createServer(app),
      io = socketIO(server);




app.use(express.static(pathName));

io.on("connection", function (socket) {
    console.log("new user connected");

    socket.on("disconnect", ()=>{
        console.log("User disconnected from server");
    })
});

server.listen(http_PORT, ()=>{
    console.log(`Server is up on ${http_PORT}`)
});


