let socket = io();

socket.on("connect", ()=>{
    console.log("connected to server")
});

socket.on("disconnect", ()=>{
    console.log("You are disconnected from Server")
});


socket.on("newEmail", (itemFromEmail)=>{
    console.log("This email is from " + itemFromEmail.from + "\n" + "The subject of the email is " + itemFromEmail.subject);
});

socket.emit("createEmail", {
    name: "Pesh Irani",
    age:29,
    city: "Sterling Heights",
    state: "Michigan",
    country: "USA"
});

socket.on("newMessageEvent", (message)=>{
    console.log(`${message.from}  "says "  ${message.text} created at ${message.createdAt}`)
});


socket.emit("createMessageEvent", {
        from: "Peshotan Irani",
        text: "this is from the client side, good morning folks, how is everyone???",
        createdAt: "4:17pm Aug 2, 2018"
    }
);