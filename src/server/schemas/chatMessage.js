const mongoose = require("mongoose");
const { v4 } = require("uuid");

const chatMessageSchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    recipient:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        min:[1,"Message cannot be blank"],
        max:[300,"Message cannot be longer than 300 characters"],
    },
},{timestamps:true});

chatMessageSchema.pre("save",function(){
    this.id = v4();
});

module.exports = mongoose.model("ChatMessage",chatMessageSchema,"conversations");