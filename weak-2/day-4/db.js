// 1 to connect
const { clear } = require("console")
const mongoose=require("mongoose")
const { stringify } = require("querystring")

// const main=async()=>{
//     // console.log("hellow")
//     try{
//         const connection=await mongoose.connect("mongodb://127.0.0.1:27017/web24")
//         console.log("connection successfull")
//         //query to crete one student document
//     //    await StudentModel.insertMany([{name:"Deepak",age:23,course:"MERN"}])
//        const result=await StudentModel.find()
//        console.log(result) 
//        connection.disconnect()
//     }
//     catch(err){
//         console.log(err)
//     }

// }

// main()

// to have schema or structure or model
// model 1={
//     name:stringify,
//     age:number
// }



// const StudentModel=mongoose.model("student",mongoose.Schema({
//     name:String,
//     age:Number,
//     course:String,

// }))
// const InstructorModel=mongoose.model("employee",mongoose.Schema({
//     name:String,
//     age:Number,
//     salary:Number,
//     experience:Number,
//     role:String,

// }))






//  ********************Conecting with express ****************

const connection=mongoose.connect("mongodb://127.0.0.1:27017/web24")

const studentScheme=mongoose.Schema({
    name:String,
    age:Number,
    course:String,
})

const StudentModel=mongoose.model("student",studentScheme)

module.exports={
    connection,
    StudentModel
}