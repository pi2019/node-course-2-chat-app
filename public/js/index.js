let socket = io();

//WHEN THE SOCKET IS CONNECTED TO SERVER
socket.on("connect", ()=>{
    console.log("connected to server")
});

//WHEN THE SOCKET IS DISCONNECTED TO SERVER
socket.on("disconnect", ()=>{
    console.log("You are disconnected from Server")
});

// //AN EVENT LISTENER for new email
// socket.on("newEmail", (itemFromEmail)=>{
//     console.log("This email is from " + itemFromEmail.from + "\n" + "The subject of the email is " + itemFromEmail.subject);
// });
//
// //AN EVENT TO CREATE A NEW EMAIL AND EMIT IT
// socket.emit("createEmail", {
//     name: "Pesh Irani",
//     age:29,
//     city: "Sterling Heights",
//     state: "Michigan",
//     country: "USA"
// });


//EVENT TO LISTEN FOR NEW MESSAGE FROM SERVER
socket.on("newMessageEvent", (message)=>{
    console.log(`${message.from} \nsays   ${message.text} \n created at ${message.createdAt}`);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    var li =$("<li></li>");
    li.text(`${message.from} ${formattedTime} : ${message.text} \n `);

    jQuery("#messages").append(li);
});


//EMITING NEW MESSAGE // The 3rd parameter for the socket.emit function is the callback with the parameter we specify in the socket.on("createMessageEent", {data}, callback
// socket.emit("createMessageEvent", {
//         from: "Peshotan Irani",
//         text: "this is from the client side, good morning folks, how is everyone???",
//         createdAt: "4:17pm Aug 2, 2018"
//     }, function(data){
//         console.log("The server got the Message");
//         console.log(`this is the data that came back ${data}`)
//     }
// );



$("#message-form").on("submit", function(e) {
    e.preventDefault();

    socket.emit("createMessageEvent",{
        from:"User",
        text: $('[name="message"]').val()
    }, (data)=>{
        console.log("server received the message");
        console.log(data)
    });

    document.querySelector("input").value = "";
});


//LOCATION SHARING

const locationButton = $("#send-location");

locationButton.on("click",function () {
    if(!navigator.geolocation){
        return ("Your browser doesn't support geolocation")
    }

    locationButton.attr("disabled", "disabled");
    document.getElementById("send-location").innerText = "Sending your location";
    // document.getElementById("send-location").setAttribute("disable", "disable");

    navigator.geolocation.getCurrentPosition(function (coordinates) {
        socket.emit("createLocationMessage", {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
        }, (acknowledgement)=>{ //this is the callbackfunction
            console.log(acknowledgement);
        })
    }, function () {
        document.getElementById("send-location").removeAttribute("disabled");
        document.getElementById("send-location").innerText = "Send location";
        alert("Please turn on your Location")
    })
});

socket.on("newLocationMessage", (message)=>{
    document.getElementById("send-location").removeAttribute("disabled");
    document.getElementById("send-location").innerText = "Send location";
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = $("<li></li>");
    let a = $("<a target='_blank'>My Current Location</a>");

    // console.log(`${message.from} \nsays   ${message.text} \ncreated at ${message.createdAt}`);
    li.text(`${message.from}: ${formattedTime} `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});




