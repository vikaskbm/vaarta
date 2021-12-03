import express from "express";


const main = async () => {
    const app = express();
    app.listen(8800, ()=> {
        console.log("Backend running");
    })
}

main();