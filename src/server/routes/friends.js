const express = require("express");
const FriendRequest = require("../schemas/friendrequest");
const User = require("../schemas/user");
const router = express.Router();
const {parseCookie,checkForSession}  = require("../utils");

// GET / -> friend list
// GET /requests -> friend requests
// POST /request -> pending state , send info to recipient
// PATCH /accept -> accepted state on fr
// PATCH /decline -> declined state on fr
// PATCH /cancel -> remove whole friend request object

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
    res.status(500).send(err.message);
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
        res.status(500).send(err.message);
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
            if(!recipient) return res.status(404).send({message:"Seems like this user doesn't exist"});
            //comparing mongoose objectIds to determine if requester is the same as user he wants to befriend
            if(recipient._id.toString() === user_id.toString()) return res.status(404).send({message:"You cannot send friend request to yourself"});
            
            const frExists = await FriendRequest.findOne({requester:user_id,recipient:recipient._id,status:"pending"});
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
        res.status(500).send(err.message);
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
                recipient.acceptFriend(requester._id);
                requester.acceptFriend(recipient._id);
                const isAccepted = friendRequest.accept();
                friendRequest.save();
                if(isAccepted)  res.status(200).send({message:"Friend request accepted"});
                else res.status(200).send({message:"Friend request already accepted"});
            }else{
                res.status(200).send({message:"Friend request no longer pending"});
            }            
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
    }catch(err){
    res.status(500).send(err.message);
    }
});

router.patch("/decline",async (req,res)=>{
try{
    const cookie = parseCookie(req.headers.cookie);
    const {requesterId} = req.body;
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
        const requester = await User.findOne({id:requesterId});
        if(!requester) return res.status(404).send({message:"Bad Request"}); 
        const pendingRequest = await FriendRequest.findOne({requester:requester._id,recipient:user_id});        
        if(pendingRequest){
            const isDeclined = pendingRequest.decline();
            pendingRequest.save();
            if(isDeclined) res.status(200).send({message:"Friend request declined"});  
            else  res.status(200).send({message:"Friend request was already declined"});  
        }else{
            res.status(200).send({message:"Friend request is no longer pending"});
        }

    }else{
        res.status(401).send({message:"Unauthorized"});
    }
}catch(err){
res.status(500).send(err.message);
}
});

router.patch("/cancel",async (req,res)=>{
    try{
        const cookie = parseCookie(req.headers.cookie);
        console.log(cookie)
        const {recipientId} = req.body;
        if(cookie){
            const session = await checkForSession(cookie.session_id);
            const {user_id} = session.session;
            const recipient = await User.findOne({id:recipientId});
            const pendingRequest = await FriendRequest.findOneAndDelete({requester:user_id,recipient:recipient._id,status:"pending"});        
            if(pendingRequest){
               res.status(200).send({message:"Outgoing friend request cancelled"});
            }else{
                res.status(200).send({message:"Friend request is no longer pending"});
            }
    
        }else{
            res.status(401).send({message:"Unauthorized"});
        }
    }catch(err){
    res.status(500).send(err.message);
    }
});

module.exports = router;