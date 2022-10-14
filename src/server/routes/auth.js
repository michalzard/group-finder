const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const { parseCookie, checkForSession, deleteSession } = require("../utils");

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
          const {message,code} = err;
          if(code == 11000)res.status(400).send({ message: "This email is in use"});
          else res.status(400).send({message});
        });
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(500).send(err.message);
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
        res.status(401).send({ message: "Username or password is incorrect" });
      }
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/logout", async (req, res) => {
  try{
    if(req.headers.cookie){
    const cookie = parseCookie(req.headers.cookie);
    //clear cookie there removing session on client side and delete session from db
    const deletedSession=await deleteSession(cookie.session_id);
    res.clearCookie("session_id");
    if(deletedSession) res.status(200).send({message:"User logged out"});
    else res.status(200).send({message:"Session expired"});
    }else res.status(200).send({message:"Session expired"});
  }catch(err){
    res.status(500).send(err.message);
  }
});


router.get("/session",async (req,res)=>{
  try{
    if(req.headers.cookie){
    const cookie = parseCookie(req.headers.cookie);
    const sessionObject = await checkForSession(cookie.session_id);
    const {user_id} = sessionObject.session;
    const foundUser = await User.findById(user_id);
    if(foundUser){
      res.status(200).send({message:"Session loaded",user:foundUser.toJSON()});
    }else{
      res.status(204).send({message:"Session expired"});
    }
  }else{
    res.status(401).send({message:"Session expired"});
  }
}catch(err){
  res.status(500).send(err.message);
}
})
module.exports = router;
