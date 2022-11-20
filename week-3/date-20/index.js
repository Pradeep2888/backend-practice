const express=require("express")
const { connection } = require("./config/db")
const { UserModel } = require("./models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { NoteModel } = require("./models/Note.model");
const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to home")
})

app.get("/dashboard",async (req,res)=>{
    // const {token}=req.query
    const token=req.headers.authorization
    console.log(token)
     try{
         var decoded = jwt.verify(token, 'abcd12345');
         const {email}=decoded
        const {id}=await UserModel.findOne({email})
        const data=await NoteModel.find({user_id:id})
        console.log(data)
          res.send(`welcome ${email} to dashboard`)

     }
     catch(err){
       console.log(err)
       res.send("Please Login again")
     }

    // if(Number(token)===54321){
    //     res.send("welcome to dashboard")
    // }
    // else{
    //     res.send("please login again")
    // }
    // res.send("ki")
})


app.post("/addnote",async(req,res)=>{

    const token=req.headers.authorization
    const {heading,note,tag}=req.body
    try{
        var decoded = jwt.verify(token, 'abcd12345');
        const {email}=decoded
        const {id}=await UserModel.findOne({email})
        
        const new_note= new NoteModel({
            heading:heading,
            note:note,
            tag:tag,
            user_id:id
        })
        await new_note.save()
          res.send(`note is added`)

     }
     catch(err){
       console.log(err)
       res.send("Please Login again")
     }
})



app.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            res.send("Something went wrong ,please signup later")
        }


        const new_user= new UserModel({
            email:email,
            password:hash
        })
        await new_user.save()
        res.send("signup successfull")

    });


})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user=await UserModel.findOne({email})
    //  console.log(user.id)
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            const token=jwt.sign({email:email }, 'abcd12345');
             res.send({"msg":"Login Successfull" , "token":token ,"id":user.id })
         } 
         else{
             res.send("login failed")
         }      
    });




    // const result=await UserModel.findOne({email,password})
    // console.log(result.id)
                 
})


app.listen(8000,async()=>{
    try{
        await connection
        console.log("connected to db successfully")
    }
    catch(err){
        console.log("error to connect db")
        console.log(err)
    }
})