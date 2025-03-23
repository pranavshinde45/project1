const mongoose=require("mongoose")
const {Schema}=mongoose;
const review=require("./reviews.js")

const listingSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    category:{
        type:String
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const listing =mongoose.model("listing",listingSchema)

module.exports=listing;