const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const {cookieCheck} = require("../middlewares/cookies");
const {parseCookie, checkForSession} = require("../utils");

router.patch("/update",cookieCheck,async (req,res)=>{
    try{
    const cookie = parseCookie(req.headers.cookie);
    const {user_id} = await checkForSession(cookie.session_id);
    const {email,birthday,location,languages,newPassword} = req.body;
    const user = await User.findOneAndUpdate(user_id,{
        email : email ? email : user.email,
        birthday,
        location,
        languages,
        password:newPassword ? newPassword : user.password,
    },{runValidators:true});
    
}catch(err){
    res.status(500).send(err.message);
}
});

module.exports = router;