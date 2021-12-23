const router = require('express').Router();


export default router.get("/", (req:any, res:any)=> {
    res.send("user route")
})
