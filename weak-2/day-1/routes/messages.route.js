const express = require("express");

const messageRouter=express.Router()

messageRouter.post("/add",(req,res)=>{
 res.send("received your message")
})
messageRouter.get("/",(req,res)=>{
    res.send("message")
})
messageRouter.delete("/delete ",(req,res)=>{
    res.send("deleted your message")
})

module.exports={messageRouter}