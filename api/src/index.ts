import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";

import userRoute from "./router/users";

require("dotenv").config();

const main = async () => {
    const app = express();
  
    mongoose.connect(
        process.env.MONGO_URL,
        () => {
          console.log("Connected to MoczxcxzngoDB");
        }
    );
    
    // Middleware
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    app.get("/", (req, res)=> {
        res.send("Hello there")
    })

    app.use("/api/users/", userRoute)

    app.listen(8800, ()=> {
        console.log("Backend running");
    })
}

main();