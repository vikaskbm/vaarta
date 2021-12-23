import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 6
        },
        profilePic: {
            type: String, 
            default: ""
        }
    },
    {
        timestamps: true
    }
);


export default model("User", UserSchema);