const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../schemas/user");
const { parseCookie, checkForSession } = require("../utils");

router.post("/register", (req, res) => {
  try {
    //handle registration
    const { email, username, password, locations } = req.body;
    if (email && username && password) {
      //create new user object
      const registeredUser = new User({
        username,
        email,
        password,
      });
      registeredUser.save()
        .then((doc) => {
          doc.set("password", undefined);
          req.session.user_id=registeredUser._id;
          req.session.save();
          res.cookie("session_id",req.session.id,{httpOnly:true,maxAge: 1000 * 60 * 60 * 24, /*1 day*/ });
          res.status(200).send({ message: "User registered", user: doc });
        })
        .catch((err) => {
          res.status(422).send({ message: "Unprocessable Entity", err });
        });
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  //handle login
  const { username, password } = req.body;
  try {
    if (username && password) {
      //we got both username & password,
      //check with server if user exists
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        const isValidPassword = await foundUser.validatePassword(password);
        
        if(isValidPassword){
          req.session.user_id=foundUser._id;
          req.session.save();
          res.cookie("session_id",req.session.id,{httpOnly:true,maxAge: 1000 * 60 * 60 * 24, /*1 day*/ }); 
          res.status(200).send({message:"Login successful",user:foundUser.toJSON()});
        }
        else res.status(401).send({message:"Username or password is incorrect"});
      } else {
        res.status(404).send({ message: "Username or password is incorrect" });
      }
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/logout", (req, res) => {});


router.get("/session",async (req,res)=>{
  try{
  const cookie = parseCookie(req.headers.cookie);
  if(cookie.session_id){
    const sessionObject = await checkForSession(cookie.session_id);
    const {user_id} = sessionObject.session;
    const foundUser = await User.findById(user_id);
    if(foundUser){
      res.status(200).send({message:"Session loaded",user:foundUser.toJSON()});
    }else{
      res.status(204).send({message:"Session expired"});
    }
  }else res.status(204).send({message:"Session expired"});
}catch(err){
  res.status(500).send(err);
}
})
module.exports = router;
