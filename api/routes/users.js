const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.get("/me", async (req, res) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        res.send({user: null})
        return
    }
    const token = authHeader.split(" ")[1]
    if(!token) {
        res.send({user: null})
        return
    }

    let userId = "";
    try {
        const payload = jwt.verify(token, '')
        userId = payload.userId
    } catch(err) {
        res.send({user: null})
        console.log(err.message)
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