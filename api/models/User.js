const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        githubId: { type: String , unique : true },
        name: String,
        username: String,
        avatar: String,
        plant: String,
    }
);

module.exports = mongoose.model("User", UserSchema)