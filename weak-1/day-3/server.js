const express =require("express")
const fs=require("fs")

const app =express()

app.use(express.json())

// app.get("/",(req,res)=>{
//     const readStream=fs.createReadStream("./data.txt",{encoding:"utf-8"})
//     readStream.pipe(res)
// // res.send("welcome")
// })

// app.get("/profile",(req,res)=>{

//     res.send("welcome to profile")
// })

// app.post("/uploaddata",(req,res)=>{
//     fs.appendFileSync("./data.txt",JSON.stringify(req.body),{encoding:"utf-8"})
//     res.send("thanks") 
// })



app.get("/",(req,res)=>{
    res.send("home")
})

app.get("/products/:id",(req,res)=>{
    const {id}=req.params
    res.send("product"+id)
})

app.get("/products",(req,res)=>{
    const {price}=req.query
    res.send("product"+price)
})

app.get("/products",(req,res)=>{
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const product=parsedData.products
    res.send(JSON.stringify(product))
})

app.post("/addproducts",(req,res)=>{
    // 1.accessing the product the client is sending
    const product=JSON.stringify(req.body)
    // fs.appendFileSync("./db.json",product,{encoding:"utf-8"})
    // 2.read the file
    const file=fs.readFileSync("db.json",{encoding:"utf-8"})
    const parsedFile=JSON.parse(file)
    // 3.Modify the product in the file
    parsedFile.products.push(req.body)
    console.log(parsedFile )
    // 4.write the file back
    fs.writeFileSync("./db.json",JSON.stringify(parsedFile),{encoding:"utf-8"})
    res.send("your product is sended")
})


app.listen(8080,()=>{
    console.log("server is runnung")
})

