const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jsonwebtoken')
const cors = require('cors')

const User = require('./models/User')
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");
const messageRoute = require('./routes/messages')

dotenv.config();

// const main = async() => {
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
  app.use(cors({origin: '*'}))

  // passport strategy
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:8100/auth/github/callback",
    },

    async function(_, __, profile, cb) {
      let user = await User.findOne({ githubId: profile.id })

      if(user) {
        await user.save()
      } else {
        user = new User({
          githubId: profile.id,
          name: profile.displayName,
          username: profile.username,
          avatar: profile._json.avatar_url,
        })
        let result = await user.save();
      }
      cb(null, {accessToken: jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1y"
      })})
    }
  ));

  app.get('/auth/github',
    passport.authenticate('github', {session: false}));

  app.get('/auth/github/callback', 
    passport.authenticate('github', {session: false}),
    function(req, res) {
      res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`)
    });

  app.use("/api/users", userRoute);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);

  const server = app.listen(8100, () => {
    console.log("Backend server is running!" + 8100);
  });
// }

// main();

const io = require('socket.io')(server, {
  cors: {
      origin: "*",
  },
});


let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
        users.push({userId, socketId})
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (userId, socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
io.on('connection', (socket) => {

    // User connected
    console.log('a user connected!');

    socket.on("addUser", (userId) => {
        console.log("Add user")
        console.log(userId)
        addUser(userId, socket.id)
        socket.emit("getUsers", users)
    })

    // Send messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        if(user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }
    })

    // User disconnected
    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id);
        socket.emit("getUsers", users)
    })

});
