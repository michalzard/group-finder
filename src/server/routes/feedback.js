const express = require("express");
const router = express.Router();
const { cookieCheck } = require("../middlewares/cookies");
const { parseCookie, checkForSession } = require("../utils");
const Feedback = require("../schemas/feedback");

//User can only submit so they can access POST
// admins will be able to read it aswell so they get GET aswell

router.post("/new", cookieCheck, async (req, res) => {
  const cookie = await parseCookie(req.headers.cookie);
  const sessionObj = await checkForSession(cookie.session_id);
  const { user_id } = sessionObj.session;
  const { title, text } = req.body;
  console.log(user_id, title, text);
  const submittedFeedback = new Feedback({
    title,
    feedback: text,
    submittedBy: user_id,
  });
  try {
    if (submittedFeedback) {
      await submittedFeedback.save();
      res.status(204);
    } else {
      res.status(404).send({ message: "Title or feedback text is missing" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
