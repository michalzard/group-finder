const mongoose = require("mongoose");
const { v4 } = require("uuid");

const friendRequestSchema = new mongoose.Schema(
  {
    id: {
      type:String,
    },
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
friendRequestSchema.pre("save",function(next){
  this.id = v4();
  return next();
})
friendRequestSchema.methods.toJSON = function (){
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
}

friendRequestSchema.methods.accept = function (){
  if(this.status !== "accepted"){this.status = "accepted"; return true}
  return false;
}

friendRequestSchema.methods.decline = function (){
  if(this.status !== "declined"){this.status = "declined"; return true}
  return false;
}


module.exports = mongoose.model("FriendRequest", friendRequestSchema);
