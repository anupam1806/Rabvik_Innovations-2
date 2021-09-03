const router = require('express').Router();
const Funds = require('../models/Funds') ;
router.get('/' , (req,res)=>{
    res.render("./Funds/funds.ejs") ;
}) ;
router.post('/' , async(req,res)=>{
    const fetchedData = await Funds.findOne({userId : req.session.user._id}) ;
    var pastfundsData = req.body["Equity"] ;
    console.log(pastfundsData)
    if(fetchedData){
        fetchedData["Product and R&D"] = req.body["Product and R&D"] ;
        fetchedData["Sales and Marketing"] = req.body["Sales and Marketing"] ;
        fetchedData["Inventory"] = req.body["Inventory"] ;
        fetchedData["Operations"] = req.body["Operations"] ;
        fetchedData["Capital Expenditures"] = req.body["Capital Expenditures"] ;
        fetchedData["Others"] = req.body["Others"] ;
        fetchedData["Past Funds"] = [req.body["Equity"],req.body["Capital Raised"],req.body["Valuation"],req.body["Closed Date"]];
        await fetchedData.save() ; 
    }else{
        const newData = new Funds({
            userId : req.session.user._id,
            "Product and R&D" : req.body["Product and R&D"] ,
            "Sales and Marketing" : req.body["Sales and Marketing"] ,
            "Inventory" : req.body["Inventory"] ,
            "Operations" : req.body["Operations"] ,
            "Capital Expenditures" : req.body["Capital Expenditures"] ,
            "Others" : req.body["Others"] ,
            "Past Funds" : [req.body["Equity"],req.body["Capital Raised"],req.body["Valuation"],req.body["Closed Date"]]
        });
        await newData.save() ;
    }
    res.redirect('/funds') ;
});
router.get('/pastfunds' , (req,res)=>{
    res.render("./Funds/pastfunds.ejs") ;
}) ;

module.exports = router;