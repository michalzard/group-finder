const express = require("express");
const router = express.Router();
const {
  checkCookie,
  parseCookie,
  checkForSession,
} = require("../middlewares/sessioncookies");
const Feedback = require("../schemas/feedback");

//User can only submit so they can access POST
// admins will be able to read it aswell so they get GET aswell

router.post("/new", checkCookie, async (req, res) => {
  const cookie = await parseCookie(req.headers.cookie);
  const sessionObj = await checkForSession(cookie.session_id);
  const { user_id } = sessionObj.session;
  const { title, text } = req.body;
  const submittedFeedback = new Feedback({
    title,
    feedback: text,
    submittedBy: user_id,
  });
  try {
    if (submittedFeedback) {
      await submittedFeedback.save();
      res.status(200).send({ message: "Feedback submitted successfully" });
    } else {
      res.status(404).send({ message: "Title or feedback text is missing" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
