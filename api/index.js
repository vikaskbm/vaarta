const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jsonwebtoken')

const User = require('./models/User')
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

const main = async() => {
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

    async function(_, __, profile, cb) {
      console.log(profile._json.avatar_url);
      let user = await User.findOne({ githubId: profile.id })
      console.log(1, user)

      if(user) {
        console.log(2, user)
        await user.save()
      } else {
        user = new User({
          githubId: profile.id,
          name: profile.displayName,
          username: profile.username,
          avatar: profile._json.avatar_url,
        })
        console.log(2, user)
        let result = await user.save();
        console.log(3, result)
      }
      cb(null, {accessToken: jwt.sign({userId: user.id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1y"
      })})
    }
  ));

  app.get('/auth/github',
    passport.authenticate('github', {session: false}));

  app.get('/auth/github/callback', 
    passport.authenticate('github', {session: false}),
    function(req, res) {
      res.send(req.user)
    }); 
  // app.use("/api/auth", authRoute);
  // app.use("/api/users", userRoute);

  app.listen(8100, () => {
    console.log("Backend server is running!" + 8100);
  });
}

main();