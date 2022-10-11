const express = require("express");
const FriendRequest = require("../schemas/friendrequest");
const User = require("../schemas/user");
const router = express.Router();
const {parseCookie,checkForSession}  = require("../utils");

// GET -> requests
// POST -> request -> pending state , send info to recipient
// POST -> accept -> accepted state,remove request object , send info to requester
// POST -> block -> blocked state,remove request object, hold id in blocked array 
// DELETE -> decline ->declined state,remove request object


router.get("/requests",async (req,res)=>{
    try{  
    const cookie = parseCookie(req.headers.cookie);
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
        const requester = await User.findById(user_id);
        const friendRequests = await FriendRequest.find({$or:[{requester:user_id},{recipient:user_id}]})
        .populate("recipient").populate("requester");

        if(friendRequests) res.status(200).send({message:"Friend Requests",requests:[
            {
                type:"outgoing",
                requests:friendRequests.filter(request=>{
                if(request.status === "pending" && request.requester.id === requester.id)
                return request})
            },
            {
                type:"pending",
                requests:friendRequests.filter(request=>{
                if(request.status === "pending" && request.requester.id !== requester.id)
                return request})
            }
        ]});
        else res.status(404).send({message:"Friend Requests unavailable"});
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

router.post("/request", async (req,res)=>{
    try{  
        const cookie = parseCookie(req.headers.cookie);
        const { recipientId } = req.body;
        if(cookie){
            const session = await checkForSession(cookie.session_id);
            const {user_id} = session.session;
            if(recipientId){
            const recipient = await User.findOne({id:recipientId});
            const frExists = await FriendRequest.findOne({requester:user_id,recipient:recipient._id});
            if(frExists){
                res.status(200).send({message:`Friend request for ${recipient.username} is already pending`});
            }else {
            const sentPendingFR = new FriendRequest({
                requester:user_id,
                recipient:recipient._id,
            });
            sentPendingFR.save();
            res.status(200).send({message:`Friend request sent to ${recipient.username}`});
        }
        }else{
            res.status(400).send({message:"Bad Request"});
        }
        }else{
            res.status(401).send({message:"Unauthorized"});
        }
    }catch(err){
        res.status(500).send(err);
    }       
})

router.post("/accept",async(req,res)=>{
 try{
    const cookie = parseCookie(req.headers.cookie);
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;

    }else{
        res.status(400).send({message:"Bad Request"});
    }
 }catch(err){
    res.status(500).send(err);
 }
});

router.post("/decline",(req,res)=>{
try{

}catch(err){
res.status(500).send(err);
}
});


module.exports = router;