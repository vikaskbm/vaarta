const router = require("express").Router();
const Conversation = require('../models/Conversation')

// Create new conversation
router.post("/", (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
})
// get conversation

module.exports = router