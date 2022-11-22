const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const { cookieCheck } = require("../middlewares/cookies");
const { parseCookie, checkForSession } = require("../utils");

router.patch("/update", cookieCheck, async (req, res) => {
  try {
    const cookie = parseCookie(req.headers.cookie);
    const { session } = await checkForSession(cookie.session_id);
    const { user_id } = session;
    const { email, birthday, location, languages, newPassword } = req.body;
    const user = await User.findById(user_id);

    user.email = email ? email : user.email;
    user.birthday = birthday ? birthday : user.birthday;
    user.location = location ? location : user.location;
    user.languages = languages
      ? languages.map((lang) => lang.label)
      : user.languages;
    user.password = newPassword ? newPassword : user.password;

    if (user) {
      user.save();
      res.status(200).send({ message: "User profile updated" });
    } else res.status(404).send({ message: "Unable to update profile" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
