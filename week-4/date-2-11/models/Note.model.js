const mongoose = require("mongoose")

const noteSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    note:{type:String,required:true},
    tag:{type:String,required:true},
    user_id:{type:String,require:true}
})

const NoteModel=mongoose.model("notes",noteSchema)


module.exports={NoteModel}