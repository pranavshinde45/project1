const express=require("express")
const app=express()
const mongoose=require("mongoose")
const session=require("express-session")
const MongoStore=require("connect-mongo");
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy = require("passport-local").Strategy;
const user=require("./models/user.js")
const listing=require("./models/listing.js")

const port=8080;
const path=require("path")
const methodoverride=require("method-override")
const ejsmate=require("ejs-mate")
const listingsRouter=require("./routes/listing.js")
const reviewsRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")


app.set("view engine","ejs")
app.engine("ejs",ejsmate)
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"))
app.use(express.static(path.join(__dirname,"/public")))

const dbUrl=process.env.ATLASDB_URL

async function main(){
    mongoose.connect(dbUrl)
}
main()
.then(()=>{
    console.log("connection successful")
})
.catch((err)=>{
    console.log(err)
})

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
      secret:process.env.SECRET
    },
    touchAfter:24*3600
  })


//session
const sessionoptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionoptions))
app.use(flash())

  

//passport
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.curruser=req.user
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
})


app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

app.use("/listing/:id/review",reviewsRouter)
app.use("/listing",listingsRouter)
app.use("/",userRouter)










//middleware
app.use((err,req,res,next)=>{
    let {status=500,message="some error"}=err;
    // res.status(status).send(message)
    res.status(status).render("listings/error.ejs",{err})
})