const {Server} = require("socket.io");
require("dotenv").config();

const io = new Server(process.env.GATEWAY_PORT,{ 
    cors:{
        origin:process.env.CLIENT_URL,
    }
});

//figure out auth

io.on("connection",(socket)=>{

    socket.emit("connection",`${socket.id} connected to Gateway`);
})
