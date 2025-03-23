const express=require("express");
const wrapasync = require("../utils/wrapasync");
const router=express.Router()
const user=require("../models/user")
const passport=require("passport");
const { saveredirectUrl } = require("../middleware");
const usercontrollers=require("../controllers/user")
//signin
router.get("/signup",usercontrollers.rendersignupform)

router.post("/signup",wrapasync(usercontrollers.signup))

//login
router.get("/login",usercontrollers.randerloginform)

router.post("/login",
    saveredirectUrl, 
    passport.authenticate
    ('local', { failureRedirect: '/login',failureFlash:true}),
    usercontrollers.login
)
router.get("/logout",usercontrollers.logout)
module.exports=router
