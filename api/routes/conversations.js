const router = require("express").Router();
const Conversation = require('../models/Conversation')

// Create new conversation
router.post("/", async (req, res) => {
    const newConversation = await new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch(err) {
        res.send('Something went wrong')
    }
})

// get conversation of two users
router.get("/getconv", async (req, res) => {
    const senderId = req.query.senderId
    const receiverId = req.query.receiverId
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId]}
        });
        res.status(200).json(conversation)
    } catch(err) {
        res.status(500).json(err)
    }
})

// get conversation of one user
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversations)
    } catch(err) {
        res.status(500).json(err)
    }
})

// Create a new room conversation
router.post("/room/create", async (req, res) => {
    const newRoomConversation = await new Conversation({
        members: [req.body.senderId],
        name: req.body.name,
        type: 'room',
        uuid: id
    })

    try {
        const savedRoom = await newRoomConversation.save();
        res.status(200).json(savedRoom)
    } catch(err) {
        res.send('Something went wrong')
    }
})


// Join room conversation
router.post("/room/join", async (req, res) => {
    try {
        Conversation.findOneAndUpdate(
            { uuid: req.params.roomID }, 
        { $addToSet: { members: req.params.userId  } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
        const roomConversation = await Conversation.find({
            uuid: req.params.userId,
            type: 'room'
        });
        
        const savedRoom = await newRoomConversation.save();
        res.status(200).json(savedRoom)
    } catch(err) {
        res.send('Something went wrong')
    }
})


module.exports = router