


const express=require("express")
const app=express()
const {messageRouter}=require("./routes/messages.route")
app.use("/messages",messageRouter)
const {employeesRouter}=require("./routes/employees.route")
app.use("/employees",employeesRouter)

const cors=require("cors")
app.use(cors({
    origin: 'http://example.com'
}))
// const timeLogger=(req,res,next)=>{
//     console.log(`the method is ${req.method} and the url is ${req.url}`)
//     // const start=new Date().getTime()
//     // console.log(start)
//     // console.log(req.url)

//     next()
//     // const stop=new Date().getTime()
//     // console.log(stop)
// }
// const urlLogger=(req,res,next)=>{
//     console.log(`the method is ${req.method} and the url is ${req.url}`)
//     // const start=new Date().getTime()
//     // console.log(start)
//     // console.log(req.url)

//     next()
//     // const stop=new Date().getTime()
//     // console.log(stop)
// }


// app.use(timeLogger)
// app.use(urlLogger)


app.get("/",(req,res)=>{
  
    res.send("welcom to home")
    
})
app.get("/about",(req,res)=>{
    res.send("welcom to about")
})
app.get("/contact",(req,res)=>{
    res.send("welcom to contact")
})

app.listen(3000,()=>{
    console.log("port 3000")
})