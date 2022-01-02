const router = require("express").Router();
const Conversation = require('../models/Conversation')

// Create new conversation
router.post("/", async (req, res) => {
    const newConversation = await new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        console.log(savedConversation)
        res.status(200)
    } catch(err) {
        res.send('Something went wrong')
    }
})
module.exports = router