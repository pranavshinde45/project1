if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
}

const express=require("express")
const router=express.Router()

const listing=require("../models/listing.js")
const wrapasync=require("../utils/wrapasync.js")
const ExpressError=require("../utils/ExpresssError.js")
const {isLoggedIn,isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js")
//controllers
const listingcontroller=require("../controllers/listings.js")

//image uploading
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })

router.route("/")
    .get(wrapasync(listingcontroller.index))
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapasync(listingcontroller.createlisting))
    // .post(upload.single("listing[image]"), (req, res) => { // ✅ Ensure the field name matches frontend
    //    res.send(req.file)
    // });

//new route:we created it above /listing/:id beacause it treated new as also id so to remove this confusion
router.get("/new",isLoggedIn,wrapasync(listingcontroller.renderNewForm))

router.get("/category",listingcontroller.category)

router.route("/:id")
    //show specific details
    .get(wrapasync(listingcontroller.showlisting))
    //update route
    .patch(isLoggedIn,isOwner,upload.single("listing[image]"),wrapasync(listingcontroller.updatelisting))
    //delete route
    .delete(isLoggedIn,isOwner,wrapasync(listingcontroller.destroylisting))


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingcontroller.editlisting))


module.exports=router;
