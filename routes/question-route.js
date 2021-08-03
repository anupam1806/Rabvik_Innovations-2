const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('./questionnaire/generic-question.ejs')
});
router.get('/generic',(req,res)=>{
    res.render('./questionnaire/generic-question.ejs')
});
router.get('/business',(req,res)=>{
    res.render('./questionnaire/business-question.ejs')
});
router.get('/team',(req,res)=>{
    res.render('./questionnaire/team-question.ejs')
});
router.get('/legal',(req,res)=>{
    res.render('./questionnaire/legal-question.ejs')
});
router.get('/market',(req,res)=>{
    res.render('./questionnaire/market-question.ejs')
});

module.exports = router;