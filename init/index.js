const mongoose=require("mongoose")
const listing=require("../models/listing.js")
// const initdb=require("./data.js")
const { data: sampleListings } = require("./data.js")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main()
.then(()=>{
    console.log("connection successful")
})
.catch((err)=>{
    console.log(err)
})

async function store(){
    const updateListings = sampleListings.map((obj)=>(
        {
            ...obj,
            owner:'67ae2c28eff21961cfbd4c4c',
            // category:"amazingView"
        }
    ))
    const remove=await listing.deleteMany({})
    const result=await listing.insertMany(updateListings)
    console.log(result,result.length)
}
store()

