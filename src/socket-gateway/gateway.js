const { Server } = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const FriendRequest = require("../server/schemas/friendrequest");
const User = require("../server/schemas/user");
// const { v4 } = require("uuid");

const io = new Server(process.env.GATEWAY_PORT, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

mongoose.connect(
  `${process.env.DB_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`database connected`);
  }
);

const connectedUsers = [];
io.on("connection", (socket) => {
  try {
    const { id } = socket.handshake.auth;
    if (id) connectedUsers[id] = socket.id;
    else socket.disconnect();
    console.log(`${socket.id} connected`);
    //TODO: send presence update directly to connected user to let him know
    //which of his friends are online
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
      delete connectedUsers[id];
    });

    socket.on("DM_SEND", (data) => {
      const { msg_id, to, content } = data;
      const friendSocket = connectedUsers[to];
      socket
        .to(friendSocket)
        .volatile.emit("DM_RECEIVED", { msg_id, sender: id, to, content });
    });
  } catch (err) {
    console.log(err);
  }
});

FriendRequest.watch().on("change", async (change) => {
  switch (change.operationType) {
    case "insert":
      const inserted = await FriendRequest.findById(change.fullDocument._id)
        .populate("requester", { _v: 0 })
        .populate("recipient", { _v: 0 });
      //send real time change to both socket "friends",if check just in case one of them is offline
      const recipientSocket = connectedUsers[inserted.recipient.id];
      const requesterSocket = connectedUsers[inserted.requester.id];
      if (recipientSocket) {
        io.to(recipientSocket).emit("FR_NEW", { request: inserted });
      }
      if (requesterSocket) {
        io.to(requesterSocket).emit("FR_NEW", { request: inserted });
      }
      break;
    case "update":
      break;
  }
});

User.watch().on("change", async (change) => {
  switch (change.operationType) {
    case "update":
      const userToUpdate = await User.findById(change.documentKey._id).populate("friends");
      const { id, friends } = userToUpdate;
      const socket = connectedUsers[id];
      
      if (socket && change.updateDescription.updatedFields.friends) {
        io.to(socket).emit("FRIENDLIST_UPDATE", { updatedFriendList: friends });
      }
      break;
  }
});
