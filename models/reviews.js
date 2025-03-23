const mongoose=require("mongoose")
const {Schema}=mongoose;

const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    cratedAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

const review=mongoose.model("review",reviewSchema)
module.exports=review