const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        id: Number,
        githubId: { type: String , unique : true },
        username: String,
        name: String
    }
);

module.exports = mongoose.model("User", UserSchema)