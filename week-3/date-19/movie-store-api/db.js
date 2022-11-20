const mongoose=require("mongoose")
const env=require('dotenv').config()

const connections=mongoose.connect(process.env.MONGODB_URL)

const movieScheme=mongoose.Schema({
    name:String,
    release_year:Number,
    rating:Number,
    actor:String
})

const MovieModel=mongoose.model("movieSchema",movieScheme)


module.exports={
    connections,
    MovieModel
}