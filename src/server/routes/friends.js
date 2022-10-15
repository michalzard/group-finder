const express = require("express");
const FriendRequest = require("../schemas/friendrequest");
const User = require("../schemas/user");
const router = express.Router();
const {parseCookie,checkForSession}  = require("../utils");

// GET -> requests
// POST -> request -> pending state , send info to recipient
// POST -> accept -> accepted state,remove request object , send info to requester
// POST -> block -> blocked state,remove request object, hold id in blocked array 

router.get("/",async (req,res)=>{
try{
    const cookie = parseCookie(req.headers.cookie);
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
        const {friends} = await User.findById(user_id).populate("friends",{friends:0});//dont load friends of your friends
        if(friends) res.status(200).send({message:"Friend list",friends});
        else res.status(404).send({message:"Unable to load friend list"});
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
    }catch(err){
    res.status(500).send(err);
    }
})


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
        const { username } = req.body;
        if(cookie){
            const session = await checkForSession(cookie.session_id);
            const {user_id} = session.session;
            if(username){
            const recipient = await User.findOne({username});
            if(!recipient){
                return res.status(404).send({message:"Seems like this user doesn't exist"});
            }
            const frExists = await FriendRequest.findOne({requester:user_id,recipient:recipient._id});
            if(frExists){
                res.status(200).send({message:`Friend request for ${recipient.username} is already pending`});
            }else {
            const sentPendingFR = new FriendRequest({
                requester:user_id,
                recipient:recipient._id,
            });
            if(sentPendingFR){
                sentPendingFR.save();
                res.status(200).send({message:`Your friend request was sent to ${recipient.username}`});
            }else res.status(404).send({message:`Unable to send friend request to ${recipient.username}`});
        }
        }else{
            res.status(400).send({message:"Bad Request"});
        }
        }else{
            res.status(401).send({message:"Unauthorized"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }       
})

router.patch("/accept",async(req,res)=>{
    try{
    const cookie = parseCookie(req.headers.cookie);
    const {requesterId} = req.body;
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
            const requester = await User.findOne({id:requesterId});
            const recipient = await User.findById(user_id);
            const friendRequest = await FriendRequest.findOne({recipient:user_id,requester:requester._id,status:"pending"}).populate("recipient").populate("requester");
            if(friendRequest){
                const accepted = recipient.acceptFriend(requester._id);
                friendRequest.status = "accepted";
                friendRequest.save();
                if(accepted) res.status(200).send({message:"Friend request accepted"});
                else res.status(200).send({message:"Friend request already accepted"});
            }else{
                res.status(200).send({message:"Friend request no longer pending"});
            }            
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
    }catch(err){
    res.status(500).send(err);
    }
});

router.post("/decline",async (req,res)=>{
try{
    const cookie = parseCookie(req.headers.cookie);
    const {requesterId} = req.body;
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
}catch(err){
res.status(500).send(err);
}
});


module.exports = router;