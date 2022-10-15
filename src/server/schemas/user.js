const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Email is invalid",
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Username must be atleast 3 characters"],
      maxLength: [30, "Username must be at most 30 characters"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    friends:[{type:mongoose.Types.ObjectId,ref:"User"}],
    // blocked:[{type:mongoose.Types.ObjectId,ref:"User"}],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (password) {
  try {
    //normal_password, encrypted password
    return bcrypt.compare(password, this.password);
  } catch (err) {
    return err;
  }
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj._id;
  delete obj.friends;
  delete obj.updatedAt;
  return obj;
};

userSchema.methods.acceptFriend = function (requesterId) {
  if(!this.friends.includes(requesterId)){
    this.friends.push(requesterId);
    this.save();
    return true;
  }else{
    return false;
  }
}

module.exports = mongoose.model("User", userSchema);
