const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongodb-session")(session);
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  `${process.env.DB_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`database connected`);
  }
);

const dbStore = new mongoStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});

//configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //Cookie expires after week
      httpOnly: true, //not accessible via js from client, server only
      secure: true,
    },
    saveUninitialized: false,
    store: dbStore,
  })
);

app.use(cors({ credentials: true, origin: true })); //enables cors
app.use(express.json()); //enables json request bodies
app.use(express.urlencoded({ extended: true })); //enables formdata/multiplart trough request bodies

//Routes
//
const authRoute = require("./routes/auth");
const friendsRoute = require("./routes/friends");
const chatRoute = require("./routes/chat");
const userRoute = require("./routes/user");
const feedbackRoute = require("./routes/feedback");

app.use("/auth", authRoute);
app.use("/friends", friendsRoute);
app.use("/chat", chatRoute);
app.use("/user", userRoute);
app.use("/feedback",feedbackRoute);

app.use(express.static("src/assets")); //staticly served assets like pictures

app.listen(`${process.env.API_PORT}`, () => {
  console.log(`Web server running on ${process.env.API_PORT}`);
});
