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
        const payload = jwt.verify(token, '')
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
    console.log(user)
    res.send({user})
})

module.exports = router