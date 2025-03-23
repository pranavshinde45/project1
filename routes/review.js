const express=require("express")
const router=express.Router({mergeParams:true})

const review=require("../models/reviews.js")
const listing=require("../models/listing.js")
const wrapasync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/ExpresssError.js")
const {validatereviews,isLoggedIn,isreviewauthor}=require("../middleware.js")
//controllers
const reviewcontroller=require("../controllers/reviews.js")

// add reviews
router.post("",validatereviews,isLoggedIn,wrapasync(reviewcontroller.createreview))

//delete review
router.delete("/:reviewid",isLoggedIn,isreviewauthor,wrapasync(reviewcontroller.destroyreview))

module.exports=router