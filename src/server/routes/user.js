const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const { checkCookie,parseCookie,checkForSession } = require("../middlewares/sessioncookies");

router.patch("/update", checkCookie, async (req, res) => {
  const cookie = parseCookie(req.headers.cookie);
  const { session } = await checkForSession(cookie.session_id);
  const { user_id } = session;
  const { email, birthday, location, languages, currentPassword, newPassword } =
    req.body;
  const user = await User.findById(user_id);
  try {
    if (!user) return res.status(404).send({ message: "User not found" });

    if (currentPassword && newPassword) {
      const pwComparison = await user.validatePassword(currentPassword);
      if (pwComparison) {
        user.password = newPassword ? newPassword : user.password;
        user.save();
        res.status(200).send({ message: "Password successfully changed" });
      } else {
        //currentPassword doesnt match existing one
        res.status(400).send({ message: "Password is incorrect" });
      }
    } else {
      user.email = email ? email : user.email;
      user.birthday = birthday ? birthday : user.birthday;
      user.location = location ? location.label : user.location;
      user.languages = languages
        ? languages.map((lang) => lang.label)
        : user.languages;
      user.save();
      res.status(200).send({ message: "Personal info updated", user });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
