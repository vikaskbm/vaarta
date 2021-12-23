import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";

import userRoute from "./router/users";
import authRoute from "./router/auth";

require("dotenv").config();

const main = async () => {
    const app = express();
  
    mongoose.connect(
        process.env.MONGO_URL,
        () => {
          console.log("Connected to MongoDB");
        }
    );
    
    // Middleware
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    app.use("/api/user", userRoute);
    app.use("/api/auth", authRoute)

    app.get("/", (_, res)=> {
        res.send("Hello there")
    })

    app.listen(8800, ()=> {
        console.log("Backend running");
    })
}

main();