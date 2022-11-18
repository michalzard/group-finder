const mongoose = require("mongoose");
const { v4 } = require("uuid");

const chatMessageSchema = new mongoose.Schema({
    msg_id:{
        type:String,
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    recipient:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    to:{
        type:String,
    },
    content:{
        type:String,
        min:[1,"Message cannot be blank"],
        max:[300,"Message cannot be longer than 300 characters"],
    },
    timestamp:{
        type:Date,
        default:Date.now(),
    }
},{timestamps:true});

chatMessageSchema.pre("save",function(){
    this.msg_id = v4();
});

module.exports = mongoose.model("ChatMessage",chatMessageSchema,"conversations");