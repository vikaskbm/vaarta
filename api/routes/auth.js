const router = require('express').Router();
const User = require('../models/User')

router.get("/register", async (req, res) => {
    const user = new User({
        username: "vikas",
        email: "vikas@gmail.com",
        password: "vikas456",
    })
    let result = await user.save();
    res.send('ok')
})

module.exports = router