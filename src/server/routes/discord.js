const axios = require("axios");
const express = require("express");
const router = express.Router();
const {
  checkCookie,
  parseCookie,
  checkForSession,
} = require("../middlewares/sessioncookies");
const User = require("../schemas/user");
const DISCORD_API_USERS_URL = "https://discordapp.com/api/users/@me";
const DISCORD_OAUTH2_TOKEN_URL = "https://discordapp.com/api/oauth2/token";
const DISCORD_GRANT_TYPE = "authorization_code";

router.get("/", checkCookie, async (req, res) => {
  //this is handling when user doesnt already have discord linked
  const { redirect_url, code } = req.query;

  try {
    const parsedCookie = parseCookie(req.headers.cookie);
    const sessionObject = await checkForSession(parsedCookie.session_id);
    const { user_id } = sessionObject.session;
    const payload = new URLSearchParams();
    payload.append("code", code);
    payload.append("client_id", process.env.REACT_APP_DISCORD_CLIENT_ID);
    payload.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
    payload.append("grant_type", DISCORD_GRANT_TYPE);
    payload.append("redirect_uri", redirect_url);
    payload.append("scope", "identify");

    axios
      .post(`${DISCORD_OAUTH2_TOKEN_URL}`, payload)
      .then((data) => {
        const { access_token } = data.data;
        if (access_token) {
          axios
            .get(`${DISCORD_API_USERS_URL}`, {
              headers: { Authorization: `Bearer ${access_token}` },
            })
            .then(async (data) => {
              console.log("user", data.data); //save discord username#0000 to db and redux
              const { id, username, avatar, discriminator } = data.data;
              const updated = await User.findOneAndUpdate(
                { _id: user_id },
                {
                  $set: {
                    "discord.id": id,
                    "discord.username": `${username}#${discriminator}`,
                    "discord.avatar": avatar,
                  },
                },
                { new: true } //new true makes sure that document will be returned after $set update is applied to doc
                //therefore returning the "latest" version
              );
              if (updated) {
                updated.save();
                res.status(200).send({
                  message: "Discord link established",
                  user: updated,
                });
              } else {
                res.status(400).send({ message: "Error linking discord" });
              }
            })
            .catch((err) => {
              res.status(400).send({
                message: `Issue linking discord , ${err.message}`,
                error: err.response.data,
              });
            });
        } else {
          res.status(404).send({ message: "Discord access token missing" });
        }
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: err.message, error: err.response.data });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.patch("/unlink", async (req, res) => {
  try {
    const parsedCookie = parseCookie(req.headers.cookie);
    const sessionObject = await checkForSession(parsedCookie.session_id);
    const { user_id } = sessionObject.session;
    const updated = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          "discord.id": "",
          "discord.username": "",
          "discord.avatar": "",
        },
      },
      { new: true }
    );
    if (updated) {
      res.status(200).send({ message: "Discord unlinked", updated });
    } else {
      res.status(400).send({ message: "Discord already unlinked" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
