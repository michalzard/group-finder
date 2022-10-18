const { Server } = require("socket.io");
require("dotenv").config();

const io = new Server(process.env.GATEWAY_PORT, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const connectedUsers = [];
io.on("connection", (socket) => {
  try{
    const {id} = socket.handshake.auth;
    if(id) connectedUsers[id] = socket.id;
    else socket.disconnect();

    //TODO: send presence update directly to connected user to let him know 
    //which of his friends are online

    socket.on("disconnect",()=>{
        delete connectedUsers[id];
    })

    socket.on("DIRECT_MESSAGE", (data) => {
        const {to,content} = data;
        const friendSocket = connectedUsers[to];
        socket.to(friendSocket).volatile.emit("DM_RECEIVED", {userId:id,content});
      });
    }catch(err){
      console.log(err);
    }
});
