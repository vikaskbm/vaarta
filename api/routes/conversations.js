const router = require("express").Router();
const ShortUniqueId = require('short-unique-id');
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
    
    const uid = new ShortUniqueId({ 
        length: 8,
        dictionary: 'number', 
    });

    
    const newRoomConversation = await new Conversation({
        members: [req.body.userId],
        name: req.body.name,
        type: 'room',
        uuid: uid()
    })
    
    console.log(req.body, uid())
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
            { uuid: req.body.roomID }, 
            { $addToSet: { members: req.body.userId  } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
        const roomConversation = await Conversation.findOne({
            uuid: req.body.roomID,
            type: 'room'
        });
        console.log("VIKAS", roomConversation)
        
        res.status(200).json(roomConversation)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router