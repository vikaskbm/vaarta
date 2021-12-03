import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

require("dotenv").config();

const main = async () => {
    const app = express();
  
    mongoose.connect(
        process.env.MONGO_URL,
        () => {
          console.log("Connected to MoczxcxzngoDB");
        }
    );

    app.listen(8800, ()=> {
        console.log("Backend running");
    })
}

main();