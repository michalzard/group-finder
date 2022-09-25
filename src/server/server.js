const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongodb-session")(session);
const cors = require("cors");


mongoose.connect(
  `${process.env.DB_URI || "mongodb://localhost:27017/Groups"}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dbStore = new mongoStore({
    uri:process.env.DB_URI || "mongodb://localhost:27017/Groups",
    collection:"sessions",
});

//configure sessions
app.use(session({
    secret:process.env.SESSION_SECRET || "YOUR_SESSION_SECRET_HERE",
    resave:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7, //Cookie expires after week
        httpOnly:true, //not accessible via js from client, server only
        secure:true,
    },
    saveUninitialized:false,
    store:dbStore,
}));

app.use(cors());//enables cors
app.use(express.json())//enables json request bodies
app.use(express.urlencoded({extended:true}));//enables formdata/multiplart trough request bodies

//Routes
//
const authRoute = require("./routes/auth");

app.use("/auth",authRoute)


app.use(express.static("src/assets"));//staticly served assets like pictures

app.listen(`${process.env.PORT || 5000}`, () => {
  console.log(`Web server running on ${process.env.PORT || 5000}`);
});
