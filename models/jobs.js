const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    company:String,
    position:String,
    link:String,
    timestamp:Date,
})

module.exports=new mongoose.model('jobs',jobSchema)