
const express=require("express")
const { connections, MovieModel } = require("./db")

const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome to home")
})
app.get("/movies",async(req,res)=>{
  const result=await MovieModel.find()
  res.send(result)
})

app.post("/movies/post",async(req,res)=>{
  const data=req.body
  const movie= new MovieModel(data)
  // console.log(movie)
     await movie.save()

    res.send(movie)
 
})



app.listen(8000,async()=>{
   try{
     await connections
     console.log("connected with server")
   }
   catch(err){
    console.log(err)
   }
})

