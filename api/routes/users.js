const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')

const User = require('../models/User')

dotenv.config();

router.get("/me", async (req, res) => {
    console.log("ass", req.headers)
    const authHeader = req.headers.authorization
    console.log("authHeader", authHeader)
    if(!authHeader) {
        res.send({user: null})
        return
    }
    const token = authHeader.split(" ")[1]
    console.log("\ntoken", authHeader)
    if(!token) {
        res.send({user: null})
        return
    }

    let userId = "";
    try {
        const payload = jwt.verify(token, 'fskajhfkjasbfa87uasjk')
        userId = payload.userId
    } catch(err) {
        console.log(err.message)
        res.send({user: null})
        return
    }
    if(!userId) {
    res.send({user: null})
        return
    }
    const user = await User.findById(userId)
    res.send({user})
})

// get a friend user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    console.log(userId, userName)
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router