const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
        conversationId: String,
        sender: String,
        text: String
    }
);

module.exports = mongoose.model("Message", MessageSchema)