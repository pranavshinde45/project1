const listing=require("../models/listing")

module.exports.index=async (req, res) => {
    let lists=await listing.find({});
    // console.log(lists);
    res.render("listings/index.ejs",{lists})
}

module.exports.renderNewForm=async(req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.createlisting=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename);

    let list=req.body.listing;
    list.image={url,filename}
    console.log(list);
    let newlist=new listing(list)
    newlist.owner=req.user._id
    await newlist.save()

    req.flash("success","New listing created!")
    res.redirect("/listing")
}

module.exports.showlisting=async (req,res)=>{
    let {id}=req.params;
    let list1=await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    console.log(list1);
    if(!list1){
        req.flash("error","Listing you request for does not exist!")
        return res.redirect("/listing")//here return used for stopping further execution 
    }
    res.render("listings/show.ejs",{list1})
}

module.exports.editlisting=async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let list=await listing.findById(id)
    let originalUrl=list.image.url;
    let newurl=originalUrl.replace("/upload","/upload/w_250")
    console.log(list)
    if(!list){
        req.flash("error","Listing you request for does not exist!")
        return res.redirect("/listing")//here return used for stopping further execution 
    }
    res.render("listings/edit.ejs",{list,newurl})
}

module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        list.image={url,filename}
        await list.save()
    }
    req.flash("success","Listing updated!")
    res.redirect(`/listing/${id}`)
}

module.exports.destroylisting=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let remove=await listing.findByIdAndDelete(id)
    console.log(remove);
    req.flash("success","Listing deleted!")
    res.redirect("/listing")
}
module.exports.category=async(req,res)=>{
    let {category}=req.query;
    console.log("category",category);
    let categories=await listing.find({category:category})
    console.log(categories)
    res.render("category.ejs",{categories})
}