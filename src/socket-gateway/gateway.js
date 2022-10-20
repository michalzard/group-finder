const { Server } = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const FriendRequest = require('../server/schemas/friendrequest');
const User = require("../server/schemas/user");
const { v4 } = require("uuid");

const io = new Server(process.env.GATEWAY_PORT, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});


mongoose.connect(`${process.env.DB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{console.log(`database connected`)});


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

    socket.on("DM_SEND", (data) => {
        const {msg_id,to,content} = data;
        const friendSocket = connectedUsers[to];
        socket.to(friendSocket).volatile.emit("DM_RECEIVED", {msg_id,sender:id,to,content});
      });


      FriendRequest.watch().on("change",async (change)=>{
        console.log(change);
        switch(change.operationType){
          case "insert" : 
          const inserted = await FriendRequest.findById(change.fullDocument._id).populate("requester").populate("recipient");
          //after fetching inserted doc check
          const recipientSocket = connectedUsers[inserted.recipient.id];
          const requesterSocket = connectedUsers[inserted.requester.id];
          if(recipientSocket) socket.to(recipientSocket).emit("FR_NEW",{request:inserted});
          if(requesterSocket) socket.to(requesterSocket).emit("FR_NEW",{request:inserted});
          
          break;
          case "update" :
          //when accepted  
     
          break;
          case "delete" : 
          //when deleted
          break;
        }
        
      })

      

    }catch(err){
      console.log(err);
    }

});

