const listing=require("./models/listing")
const review=require("./models/reviews.js")
const {listingSchema,reviewSchema}=require("./schema.js")


//to check user is logged in or not
module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        // console.log(req)
        req.session.redirectUrl=req.originalUrl
        req.flash("error","you must be logged in before creating a listing")
        res.redirect("/login")
    }else{
        next()
    }
}

//to redirect towards the url from where user came back to login
module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

//to check authorization
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id)
    if(!list.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","you are not owner of this listing")
        res.redirect(`/listing/${id}`)
    }
    next()
}

//to check authorization for reviews
module.exports.isreviewauthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let reviews=await review.findById(reviewid)
    if(!reviews.author.equals(res.locals.curruser._id)){
        req.flash("error","you are not author of this review")
        return res.redirect(`/listing/${id}`)
    }
    next()
}

//listing validation:server side
module.exports.validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}

//
module.exports.validatereviews=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}

