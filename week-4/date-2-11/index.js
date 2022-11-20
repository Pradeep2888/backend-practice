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

const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
     try{
         var decoded = jwt.verify(token, 'abcd12345');
        req.body.email=decoded.email
         next()

     }
     catch(err){
       console.log(err)
       res.send("Please Login again")
     }

}

const authorisation=(permitedrole)=>{
    return async(req,res,next)=>{
   const email=req.body.email
   const user=await UserModel.findOne({email})
    const role=user.role;
    if(permitedrole.includes(role)){
        next()
      }
      else{
        res.send("Not authorised")
      }
}
}

app.get("/dashboard", authentication,(req,res)=>{
   res.send("welcome to dashboard")
})

app.get("/product",(req,res)=>{
    res.send("here is your product")
})

// autontication,no authorization
app.get("/product/cart",authentication,(req,res)=>{
    res.send(`welcome here are your  product in cart`)
})

// authentication,authorization
app.post("/product/create",authentication,authorisation(["seller"]),async(req,res)=>{
    res.send("product created")
})

app.post("/product/feedback",authentication,authorisation(["customer"]),async(req,res)=>{
    res.send("feedback created")
})

app.post("/assignment/edit",authentication,authorisation(["ia","instructer"]),async(req,res)=>{
    res.send("feedback created")
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