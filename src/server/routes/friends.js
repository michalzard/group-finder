const express = require("express");
const FriendRequest = require("../schemas/friendrequest");
const User = require("../schemas/user");
const router = express.Router();
const {parseCookie,checkForSession}  = require("../utils");
const ChatMessage = require("../schemas/chatMessage");
// GET / -> friend list
// GET /requests -> friend requests
// POST /request -> pending state , send info to recipient
// PATCH /accept -> accepted state on fr
// PATCH /decline -> declined state on fr
// PATCH /cancel -> remove whole friend request object
// DELETE

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
        const userFilterOptions = {password:0,_id:0,updatedAt:0};
        const friendRequests = await FriendRequest.find({$or:[{requester:user_id},{recipient:user_id}]})
        .populate("recipient",userFilterOptions).populate("requester",userFilterOptions);
        if(friendRequests) res.status(200).send({message:"Friend Requests",requests:[
            {
                type:"outgoing",
                requests:friendRequests.filter(request=>{
                if(request.status === "pending" && request.requester.id === requester.id)
                return request.toJSON()})
            },
            {
                type:"pending",
                requests:friendRequests.filter(request=>{
                if(request.status === "pending" && request.requester.id !== requester.id)
                return request.toJSON()})
            }
        ]});
        else res.status(404).send({message:"Friend Requests unavailable"});
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
    }catch(err){
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
                if(isAccepted)  res.status(200).send({message:"Friend request accepted",acceptedId:friendRequest.id,friend:requester});
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
        const declinedRequest = await FriendRequest.findOneAndDelete({requester:requester._id,recipient:user_id});        
        if(declinedRequest){
            // const isDeclined = declinedRequest.decline();
            // declinedRequest.save();
            res.status(200).send({message:"Friend request declined",declinedId:declinedRequest.id});  
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
        const {recipientId} = req.body;
        if(cookie){
            const session = await checkForSession(cookie.session_id);
            const {user_id} = session.session;
            const recipient = await User.findOne({id:recipientId});
            const cancelledRequest = await FriendRequest.findOneAndDelete({requester:user_id,recipient:recipient._id,status:"pending"});        
            if(cancelledRequest){
               res.status(200).send({message:"Outgoing friend request cancelled",deletedId:cancelledRequest.id});
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


router.delete("/remove",async (req,res)=>{
try{
    const cookie = parseCookie(req.headers.cookie);
    const {friendId} = req.query;
    if(cookie){
        const session = await checkForSession(cookie.session_id);
        const {user_id} = session.session;
        const user = await User.findById(user_id).populate("friends");
        const friend = await User.findOne({id:friendId}).populate("friends");
        if(user && friend){
            //index used to remove friend from user's friend list
            const removeUserFriendListIndex  = user.friends.map(friend=>friend.id).indexOf(friendId);
            //the other way around
            const removeFriendFriendListIndex  = friend.friends.map(friend=>friend.id).indexOf(user.id);
            console.log(friendId,user.id);
            console.log(removeUserFriendListIndex,removeFriendFriendListIndex);
            //if one or the other returns -1 then one side is missing so just return 404
            if(removeUserFriendListIndex !== -1 && removeFriendFriendListIndex !== -1){
                user.friends.splice(removeUserFriendListIndex,1);
                friend.friends.splice(removeFriendFriendListIndex,1);
                user.save();
                friend.save();
                //remove all their messages
                ChatMessage.deleteMany({
                    $and:[{$or:[{sender:user_id},{sender:friend._id}]},{$or:[{recipient:friend._id},{recipient:user_id}]}]
                });
                //conversation between these 2 users is deleted and                 
                res.status(200).send({message:"Removed from friendlist",removedId:friend.id});
            }else{
                res.status(404).send({message:"Friendship already removed or incorrect id was provided"});
            }
        }else{
            res.status(404).send({message:"Resource unavailable"});
        }    
    }else{
        res.status(401).send({message:"Unauthorized"});  
    }
}catch(err){
    res.status(500).send(err.message);
}
});


module.exports = router;