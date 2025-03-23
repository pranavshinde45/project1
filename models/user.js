const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})//here we have not save username and password because this fields are set by passport-local-mongoose
userSchema.plugin(passportLocalMongoose)
const user=mongoose.model("user",userSchema)


module.exports=user