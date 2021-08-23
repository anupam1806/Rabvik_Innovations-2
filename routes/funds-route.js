const router = require('express').Router();

router.get('/' , (req,res)=>{
    res.render("./Funds/funds.ejs") ;
}) ;
router.get('/pastfunds' , (req,res)=>{
    res.render("./Funds/pastfunds.ejs") ;
}) ;

module.exports = router;