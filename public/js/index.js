let socket = io();

//WHEN THE SOCKET IS CONNECTED TO SERVER
socket.on("connect", ()=>{
    console.log("connected to server")
});

//WHEN THE SOCKET IS DISCONNECTED TO SERVER
socket.on("disconnect", ()=>{
    console.log("You are disconnected from Server")
});

//AN EVENT LISTENER for new email
socket.on("newEmail", (itemFromEmail)=>{
    console.log("This email is from " + itemFromEmail.from + "\n" + "The subject of the email is " + itemFromEmail.subject);
});

//AN EVENT TO CREATE A NEW EMAIL AND EMIT IT
socket.emit("createEmail", {
    name: "Pesh Irani",
    age:29,
    city: "Sterling Heights",
    state: "Michigan",
    country: "USA"
});

//EVENT TO LISTEN FOR NEW MESSAGE FROM SERVER
socket.on("newMessageEvent", (message)=>{
    console.log(`${message.from} \nsays   ${message.text} \ncreated at ${message.createdAt}`)
});


//EMITING NEW MESSAGE
socket.emit("createMessageEvent", {
        from: "Peshotan Irani",
        text: "this is from the client side, good morning folks, how is everyone???",
        createdAt: "4:17pm Aug 2, 2018"
    }
);