const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
        members: {
            type: Array,
            default: 'user'
        },
        name: {
            type: String,
        },
        type: {
            type: String
        },
        uuid: {
            type: String
        }
    }
);

module.exports = mongoose.model("Conversation", ConversationSchema)