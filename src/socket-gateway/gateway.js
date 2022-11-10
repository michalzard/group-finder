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
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`database connected`);
  }
);

const connectedUsers = [];
io.on("connection", (socket) => {
  try {
    const { id, username } = socket.handshake.auth;
    if (id) {
      connectedUsers[id] = socket.id;
      console.log(`${username} connected`);
    } else socket.disconnect();

    io.emit("PRESENCE_UPDATE", { users: getUserIds() });

    socket.on("disconnect", () => {
      console.log(`${username} disconnected`);
      delete connectedUsers[id];
      io.emit("PRESENCE_UPDATE", { users: getUserIds() });
    });

    socket.on("DM_SEND", (data) => {
      const { msg_id, to, content, timestamp } = data;
      const friendSocket = connectedUsers[to];
      socket.to(friendSocket).volatile.emit("DM_RECEIVED", {
        msg_id,
        sender: id,
        to,
        content,
        timestamp: Date.now(),
      });
    });
  } catch (err) {
    console.log(err);
  }
});
function getUserIds() {
  const connectedIds = [];
  for (let id in connectedUsers) connectedIds.push(id);
  return connectedIds;
}
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
      const userToUpdate = await User.findById(change.documentKey._id).populate(
        "friends"
      );
      const { id, friends } = userToUpdate;
      const socket = connectedUsers[id];

      if (socket && change.updateDescription.updatedFields.friends) {
        io.to(socket).emit("FRIENDLIST_UPDATE", { updatedFriendList: friends });
      }
      break;
  }
});
