const user=require("../models/user")

module.exports.rendersignupform=async(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
   try{
    let {username,email,password}=req.body;
    let newuser=new user({username,email})
    let registeredUser=await user.register(newuser,password)
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }else{
            req.flash("success","welcome to wanderlust")
            res.redirect("/listing")
        }
    })
   }catch(err){
    req.flash("error",err.message)
    res.redirect("/signup")
   }
}

module.exports.randerloginform=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to wanderlust")
    let redirectUrl=res.locals.redirectUrl||"/listing"
    res.redirect(redirectUrl)
}

module.exports.logout=async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","you are logout")
            res.redirect("/listing")
        }
    })
}