const GenericQuestion = require('../models/genericQuestion');
const {
    sectorOptions,
    businessActivities,
    marketCategory,
    devStages,
    services } = require('../public/assets/data/questionData')

const router = require('express').Router();


router.get('/',async(req,res)=>{
    res.redirect('/questionnaire/generic')
    // const genericData =await GenericQuestion.findOne({_id:"611753c7f138c12954b9de82"});
    // console.log(genericData);
    // res.render('./questionnaire/generic-question.ejs',{
    //     genericData,
    //     sectorOptions,
    //     businessActivities,
    //     marketCategory, 
    //     devStages,
    //     services 
    // })
});
router.get('/generic',async(req,res)=>{
    const genericData =await GenericQuestion.findOne({_id:"6117c1562b3fc930d42388ce"});
    // console.log(sectorOptions);
    // res.send(genericData);
    console.log(genericData);
    res.render('./questionnaire/generic-question.ejs',{
        genericData,
        sectorOptions,
        businessActivities,
        marketCategory,
        devStages,
        services 
    })
});
router.post('/generic',async(req,res)=>{
    console.log(req.body);
    const newGenric = await new GenericQuestion({
        sector : req.body.sector,
        business : req.body.business,
        market : req.body.market,
        stage : req.body.stage,
        service : req.body.service,
        mission : req.body.mission,
        founderNum : req.body.founderNum,
        founders : req.body.founders,
        employeeNum : req.body.employeeNum,
        employees : req.body.employees,
        commited_capital : req.body.commited_capital,
        target_funding : req.body.target_funding,
        owner_name : req.body.owner_name,
        owner_percentage : req.body.owner_percentage,
        past_owner : req.body.past_owner,
        past_percentage : req.body.past_percentage,
    });
    newGenric.save();
    res.redirect('/questionnaire/generic')
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