const Profile = require('../models/profile');

const router = require('express').Router();

// router.get('/',async(req,res)=>{
//     res.redirect('/user');
// });

router.get("/user",async(req,res)=>{
    // const profileDetail = await Profile.findOne({userId:req.session.user._id});
    res.render("user.ejs");
});

router.post("/user",async(req,res)=>{
    const profileDetail = await Profile.findOne({userId:req.session.user._id});
    if(profileDetail){
        profileDetail.company = req.body.company;
        profileDetail.email = req.body.email;
        profileDetail.fname = req.body.fname;
        profileDetail.lname = req.body.lname ;
        profileDetail.address = req.body.address ;
        profileDetail.city = req.body.city ;
        profileDetail.country = req.body.country ;
        profileDetail.pincode = req.body.pincode ;
        profileDetail.contact = req.body.contact ;
        profileDetail.img = req.body.img ;
        profileDetail.about = req.body.about ;
        profileDetail.save();
    }else{
        const newProfile = new Profile({
            userId:req.session.user._id,
            company:req.body.company,
            email:req.body.email,
            fname:req.body.fname,
            lname:req.body.lname,
            address:req.body.address,
            city:req.body.city,
            country:req.body.country,
            pincode:req.body.pincode,
            country:req.body.country,
            contact:req.body.contact,
            img:req.body.img,
            about:req.body.about,
        });
        await newProfile.save();
    }
})

module.exports = router;