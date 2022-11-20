const http =require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    //   res.end("hellow")
    // res.write("welcome to our very first server")
    // res.end()
    // console.log(req.url)
    // res.end("welcome to our very first server")
    if(req.url==="/"){
        // res.setHeader("content-type","text/html")
         return res.end("<h4>Hellow i am your h4 tag</h4>")
    }
   else if(req.url==="/posts"){
    //    return res.end("here are your posts")
    // res.setHeader("content-type","application/json")
    //  return res.end(JSON.stringify([{name:"pradeep"},{class:10}]))
    const posts=fs.readFileSync("./posts.json",{encoding:"utf-8"})
    res.setHeader("content-type","application/json")
         return res.end(JSON.stringify(posts))
    }
    else if(req.url==="/todos"){
       return res.end("here are your todos")
    }
})

server.listen(5000)