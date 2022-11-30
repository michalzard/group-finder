const mongoose = require("mongoose");

const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
async function checkForSession(sessionId) {
  return await mongoose.connection.db
    .collection("sessions")
    .findOne({ _id: sessionId });
}
function checkCookie(req, res, next) {
  if (req.headers.cookie) {
    next();
  } else res.status(401).send({ message: "Unauthorized" });
}

async function deleteSession(sessionId) {
  return await mongoose.connection.db
    .collection("sessions")
    .findOneAndDelete({ _id: sessionId });
}

module.exports = {
  parseCookie,
  checkCookie,
  checkForSession,
  deleteSession,
};
