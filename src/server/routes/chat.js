const express = require("express");
const router = express.Router();
const { parseCookie, checkForSession } = require("../utils");
const ChatMessage = require("../schemas/chatMessage");
const User = require("../schemas/user");
const { cookieCheck } = require("../middlewares/cookies");

router.get("/messages", cookieCheck, async (req, res) => {
  //return list of message with ids

  const cookie = parseCookie(req.headers.cookie);
  const session = await checkForSession(cookie.session_id);
  const { user_id } = session.session;
  const { recipientId } = req.query;
  const recipient = await User.findOne({ id: recipientId });
  if (!recipient) return res.status(400).send({ message: "Bad Request" });
  const conversation = await ChatMessage.find({
    $and: [
      { $or: [{ sender: user_id }, { sender: recipient._id }] },
      { $or: [{ recipient: recipient._id }, { recipient: user_id }] },
    ],
  })
    .sort({ createdAt: 1 })
    .select("-_id -__v -updatedAt -createdAt")
    .populate("sender")
    .populate("recipient");
  try {
    if (conversation)
      res
        .status(200)
        .send({ message: "Conversation loaded", conversation: conversation });
    else res.status(404).send({ message: "Unable to load conversation" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/new-message", cookieCheck, async (req, res) => {
  //create new message
  //sender,recipient,content,timestamp

  const cookie = parseCookie(req.headers.cookie);
  const { recipientId, content } = req.body;
  const session = await checkForSession(cookie.session_id);
  const { user_id } = session.session;
  if (!recipientId || !content)
    return res.status(400).send({ message: "Bad Request" });
  const recipient = await User.findOne({ id: recipientId }); //lookup recipient by uuid
  try {
    if (!recipient)
      return res.status(404).send({ message: "Unable to find recipient" });
    const newMessage = new ChatMessage({
      sender: user_id,
      recipient: recipient._id,
      to: recipientId,
      content,
    });

    if (newMessage) {
      newMessage.save();
      res.status(200).send({ message: "Message sent" });
    } else {
      res.status(400).send({ message: "Unable to send message" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
