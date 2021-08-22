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
});
router.get('/generic',async(req,res)=>{
    const genericData = await GenericQuestion.findOne({userId:req.session.user._id});
    // console.log(sectorOptions);
    // res.send(genericData);
    // console.log(genericData);
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
    // console.log(req.body);
    const fetchedUser = await GenericQuestion.findOne({userId:req.session.user._id});
    if(fetchedUser){
        // console.log(fetchedUser);
        fetchedUser.sector = req.body.sector || req.body.sectorInput || fetchedUser.sector;
        fetchedUser.business = req.body.business || req.body.businessInput || fetchedUser.business;
        fetchedUser.market = req.body.market || req.body.marketInput || fetchedUser.market;
        fetchedUser.stage = req.body.stage || req.body.stageInput || fetchedUser.stage;
        fetchedUser.service = req.body.service || req.body.serviceInput || fetchedUser.service;
        fetchedUser.mission = req.body.mission || fetchedUser.mission;
        fetchedUser.founderNum = req.body.founderNum || fetchedUser.founderNum;
        fetchedUser.founders = req.body.founders || fetchedUser.founders;
        fetchedUser.employeeNum = req.body.employeeNum || fetchedUser.employeeNum;
        fetchedUser.employees = req.body.employees || fetchedUser.employees;
        fetchedUser.commited_capital = req.body.commited_capital || fetchedUser.commited_capital;
        fetchedUser.target_funding = req.body.target_funding || fetchedUser.target_funding;
        fetchedUser.owner_name = req.body.owner_name || fetchedUser.owner_name;
        fetchedUser.owner_percentage = req.body.owner_percentage || fetchedUser.owner_percentage;
        fetchedUser.past_owner = req.body.past_owner || fetchedUser.past_owner;
        fetchedUser.past_percentage = req.body.past_percentage || fetchedUser.past_percentage;
        fetchedUser.save();
    }else{
        const newGeneric = new GenericQuestion({
            userId:req.session.user._id,
            sector : req.body.sector || req.body.sectorInput,
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
        newGeneric.save();
    }
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