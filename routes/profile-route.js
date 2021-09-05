const User = require('../models/User');
const route = require('express').Router();
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,uuid.v4()+path.extname(file.originalname))
  }
});

const upload = multer({storage});

route.get("/", async(req,res)=>{
    // console.log(req.user)
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    console.log(profileDetail);
    res.render("user",{profileDetail})
  });
  
  route.post("/", upload.single('file'),async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
      profileDetail.companyName = req.body.companyName || profileDetail.companyName;
      profileDetail.email = req.body.email || profileDetail.email;
      profileDetail.firstName = req.body.firstName || profileDetail.firstName;
      profileDetail.lastName = req.body.lastName || profileDetail.lastName;
      profileDetail.address = req.body.address || profileDetail.address;
      profileDetail.city = req.body.city || profileDetail.city;
      profileDetail.country = req.body.country || profileDetail.country;
      profileDetail.pincode = req.body.pincode || profileDetail.pincode;
      profileDetail.contact = req.body.contact || profileDetail.contact;
      if(req.file && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')){
        profileDetail.logo = req.file.path
      }
      profileDetail.about = req.body.about || profileDetail.about;
      await profileDetail.save();
      res.redirect('/user') ;
  })
  
module.exports = route;