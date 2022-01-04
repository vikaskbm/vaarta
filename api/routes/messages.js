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

// get messages
router.get("/:conversationId", async(req, res) => {
    console.log(req.params.conversationId)
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        console.log(1, messages)
        res.status(200).json(messages)
    } catch(err) {
        res.status(500).json(err)
        console.log(2, messages)
    }
})

module.exports = router