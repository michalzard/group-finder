const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default:"pending",
    },
  },
  { timestamps: true }
);

//methods -> accept,decline

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
