const router = require("express").Router();
const Message = require('../models/Message')

// add message
router.post("/", async(req, res) => {
    const newMessage = await new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(500).json(savedMessage)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router