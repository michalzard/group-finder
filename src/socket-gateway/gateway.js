const { Server } = require("socket.io");
require("dotenv").config();

const io = new Server(process.env.GATEWAY_PORT, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const connectedUsers = [];

io.on("connection", (socket) => {
    const {id,username} = socket.handshake.auth;
    if(id) connectedUsers[id] = socket.id;
    else socket.disconnect();


    socket.on("disconnect",()=>{
        delete connectedUsers[id];
    })

    socket.on("DIRECT_MESSAGE", (data) => {
        const {to,message} = data;
        const friendSocket = connectedUsers[to];
        socket.to(friendSocket).emit("DM_RECEIVED", {username,message});
      });

});
