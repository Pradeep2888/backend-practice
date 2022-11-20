const express = require("express");

const employeesRouter=express.Router()

employeesRouter.post("/add",(req,res)=>{
 res.send("received your employees")
})
employeesRouter.get("/",(req,res)=>{
    res.send("employees")
})
employeesRouter.delete("/delete ",(req,res)=>{
    res.send("deleted your employees")
})

module.exports={employeesRouter}