const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        id: Number,
        username: String,
        name: String,
    }
);

module.exports = mongoose.model("User", UserSchema)