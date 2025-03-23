const review=require("../models/reviews")
const listing=require("../models/listing")

module.exports.createreview=async(req,res)=>{
    console.log(req.params)
    let {id}=req.params;
    let newreview=new review(req.body.review);
    let listings=await listing.findById(id)
    listings.reviews.push(newreview)

    newreview.author=req.user;
    await newreview.save()
    await listings.save()
    
    req.flash("success","New review created")
    res.redirect(`/listing/${id}`)
}

module.exports.destroyreview=async(req,res)=>{
    let {id,reviewid}=req.params;
    
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await review.findByIdAndDelete(reviewid)
    req.flash("success","Review deleted")
    res.redirect(`/listing/${id}`)
}