const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User')

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

// database connect
mongoose.connect(
  process.env.MONGO_URL,
  () => {
    console.log("Connected to MongoDB");
  }
);

// passport serialize
passport.serializeUser(function(user, done) {
  done(null, user.accessToken);
});


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(passport.initialize());

// passport strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8100/auth/github/callback",
  },

  function(_, __, profile, cb) {
    console.log(profile)
    cb(null, {accessToken: '', refreshToken: ''})
  }
));

app.get('/auth/github',
  passport.authenticate('github', {session: false}));

app.get('/auth/github/callback', 
  passport.authenticate('github', {session: false}),
  function(req, res) {
    res.send("You logged in correctly")
  }); 
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);

app.listen(8100, () => {
  console.log("Backend server is running!");
});