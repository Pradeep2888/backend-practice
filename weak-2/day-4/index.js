const express=require("express")
const {connection, StudentModel}=require("./db")

const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to home")
})
app.get("/about",(req,res)=>{
    res.send("welcome to about")
})
app.get("/students",async (req,res)=>{
    const result=await StudentModel.find()
    res.send(result)
})
app.post ("/addstudent",async (req,res)=>{
    // const result=await StudentModel.find()
    const data=req.body
    // const student= await StudentModel.insertMany([data])
    const student= new StudentModel(data)
    await student.save()

    res.send(student)
})





app.listen(3000,async ()=>{
    try{
        await connection
        console.log("connected to db successfull")

    }
    catch(err){
       
        console.log("error connection to db")
        console.log(err)

    }

    console.log("Listening at 3000")
})