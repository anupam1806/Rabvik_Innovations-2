const router = require('express').Router();
const Funds = require('../models/Funds') ;
router.get('/' , (req,res)=>{
    res.render("./Funds/funds.ejs") ;
}) ;
router.post('/' , async(req,res)=>{
    const fetchedData = Funds.findOne({userId : req.body._id}) ;
    if(fetchedData){
        fetchedData["Product and R&D"] = req.body["Product and R&D"] ;
        fetchedData["Sales and Marketing"] = req.body["Sales and Marketing"] ;
        fetchedData["Inventory"] = req.body["Inventory"] ;
        fetchedData["Operations"] = req.body["Operations"] ;
        fetchedData["Capital Expenditures"] = req.body["Capital Expenditures"] ;
        fetchedData["Others"] = req.body["Others"] ;
    }
});
router.get('/pastfunds' , (req,res)=>{
    res.render("./Funds/pastfunds.ejs") ;
}) ;

module.exports = router;