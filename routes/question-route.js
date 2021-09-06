const User = require('../models/User');
const GenericQuestion = require('../models/genericQuestion');
const BusinessQuestion = require('../models/businessQuestion');
const TeamQuestion = require('../models/teamQuestion');
const LegalQuestion = require('../models/legalQuestion');
const MarketQuestion = require('../models/marketQuestion');
const {
    sectorOptions,
    businessActivities,
    marketCategory,
    devStages,
    services } = require('../public/assets/data/questionData')

const router = require('express').Router();


// router.get('/',async(req,res)=>{
//     res.redirect('/questionnaire/generic')
// });
router.get('/generic_questionnaire',async(req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    // console.log(profileDetail);
    const user_id = req.user ? req.user._id : req.session.user._id;
    const genericData = await GenericQuestion.findOne({userId:user_id}); 
    res.render('./questionnaire/generic-question.ejs',{
        genericData,
        sectorOptions,
        businessActivities,
        marketCategory,
        devStages,
        services,
        profileDetail 
    })
});
router.post('/generic_questionnaire',async(req,res)=>{
    const user_id = req.user ? req.user._id : req.session.user._id;
    const fetchedGeneric = await GenericQuestion.findOne({userId: user_id});
    // console.log(fetchedGeneric.sector) ;
    if(fetchedGeneric){
        // console.log(fetchedGeneric);
        fetchedGeneric.sector = req.body.sector || req.body.sectorInput || fetchedGeneric.sector;
        fetchedGeneric.business = req.body.business || req.body.businessInput || fetchedGeneric.business;
        fetchedGeneric.market = req.body.market || req.body.marketInput || fetchedGeneric.market;
        fetchedGeneric.stage = req.body.stage || req.body.stageInput || fetchedGeneric.stage;
        fetchedGeneric.service = req.body.service || req.body.serviceInput || fetchedGeneric.service;
        fetchedGeneric.mission = req.body.mission || fetchedGeneric.mission;
        fetchedGeneric.founderNum = req.body.founderNum || fetchedGeneric.founderNum;
        fetchedGeneric.founders = req.body.founders || fetchedGeneric.founders;
        fetchedGeneric.employeeNum = req.body.employeeNum || fetchedGeneric.employeeNum;
        fetchedGeneric.employees = req.body.employees || fetchedGeneric.employees;
        fetchedGeneric.commited_capital = req.body.commited_capital || fetchedGeneric.commited_capital;
        fetchedGeneric.target_funding = req.body.target_funding || fetchedGeneric.target_funding;
        fetchedGeneric.owner_name = req.body.owner_name || fetchedGeneric.owner_name;
        fetchedGeneric.owner_percentage = req.body.owner_percentage || fetchedGeneric.owner_percentage;
        fetchedGeneric.past_owner = req.body.past_owner || fetchedGeneric.past_owner;
        fetchedGeneric.past_percentage = req.body.past_percentage || fetchedGeneric.past_percentage;
        fetchedGeneric.save();
    }else{
        const newGeneric = new GenericQuestion({
            userId:user_id,
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
    res.redirect('/generic_questionnaire')
});

router.get('/business_questionnaire',async(req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    const user_id = req.user ? req.user._id : req.session.user._id;
    const businessData = await BusinessQuestion.findOne({userId: user_id});
    console.log(businessData);
    res.render('./questionnaire/business-question.ejs',{
        businessData,profileDetail
    });
});
router.post('/business_questionnaire',async(req,res)=>{
    const user_id = req.user ? req.user._id : req.session.user._id;
    const fetchedBusiness = await BusinessQuestion.findOne({userId: user_id});
    if(fetchedBusiness){
        fetchedBusiness.description = req.body.description;
        fetchedBusiness.service_concept = req.body.service_concept;
        fetchedBusiness.market_fit = req.body.market_fit;
        fetchedBusiness.scalable = req.body.scalable ;
        fetchedBusiness.business_model = req.body.business_model ;
        fetchedBusiness.dev_stage = req.body.dev_stage ;
        fetchedBusiness.breakeven = req.body.breakeven ;
        fetchedBusiness.save();
    }else{
        const newBusiness = new BusinessQuestion({
            userId:user_id,
            description:req.body.description,
            service_concept:req.body.service_concept,
            market_fit:req.body.market_fit,
            scalable:req.body.scalable,
            business_model:req.body.business_model,
            dev_stage:req.body.dev_stage,
            breakeven:req.body.breakeven,
        });
        await newBusiness.save();
    }
    res.redirect('/business_questionnaire')
});
router.get('/team_questionnaire',async(req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    const user_id = req.user ? req.user._id : req.session.user._id;
    const teamData = await TeamQuestion.findOne({userId: user_id});
    res.render('./questionnaire/team-question.ejs',{
        teamData,profileDetail
    })
});
router.post('/team_questionnaire',async(req,res)=>{
    const user_id = req.user ? req.user._id : req.session.user._id;
    const fetchedTeam = await TeamQuestion.findOne({userId: user_id});
    if(fetchedTeam){
        fetchedTeam.founder_num = req.body.founder_num;
        fetchedTeam.employee_num = req.body.employee_num;
        fetchedTeam.entre_exp = req.body.entre_exp;
        fetchedTeam.work_together = req.body.work_together;
        fetchedTeam.equipped_level = req.body.equipped_level;
        fetchedTeam.leadership_level = req.body.leadership_level;
        fetchedTeam.capital_invested = req.body.capital_invested;
        fetchedTeam.founder_involve_degree = req.body.founder_involve_degree;
        fetchedTeam.company_employee = req.body.company_employee;
        fetchedTeam.role_respon = req.body.role_respon;
        fetchedTeam.skill_enhance = req.body.skill_enhance;
        fetchedTeam.skill_enhance_comment = req.body.skill_enhance_comment;
        fetchedTeam.skill_avail = req.body.skill_avail;
        fetchedTeam.skill_avail_comment = req.body.skill_avail_comment;
        fetchedTeam.reward_method = req.body.reward_method;
        fetchedTeam.reward_method_comment = req.body.reward_method_comment;
        fetchedTeam.your_market_position = req.body.your_market_position;
        fetchedTeam.have_mentor = req.body.have_mentor;
        fetchedTeam.save();
    }else{
        const newTeam = new TeamQuestion({
            userId:user_id,
            founder_num : req.body.founder_num,
            employee_num : req.body.employee_num,
            entre_exp : req.body.entre_exp,
            work_together : req.body.work_together,
            equipped_level : req.body.equipped_level,
            leadership_level : req.body.leadership_level,
            capital_invested : req.body.capital_invested,
            founder_involve_degree : req.body.founder_involve_degree,
            company_employee : req.body.company_employee,
            role_respon : req.body.role_respon,
            skill_enhance : req.body.skill_enhance,
            skill_enhance_comment : req.body.skill_enhance_comment,
            skill_avail : req.body.skill_avail,
            skill_avail_comment : req.body.skill_avail_comment,
            reward_method : req.body.reward_method,
            reward_method_comment : req.body.reward_method_comment,
            your_market_position : req.body.your_market_position,
            have_mentor : req.body.have_mentor,
        });
        await newTeam.save();
    }
    res.redirect('/team_questionnaire');
});
router.get('/legal_questionnaire',async(req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    const user_id = req.user ? req.user._id : req.session.user._id;
    const legalData = await LegalQuestion.findOne({userId: user_id});
    res.render('./questionnaire/legal-question.ejs',{
        legalData,profileDetail
    })
});
router.post('/legal_questionnaire',async(req,res)=>{
    const user_id = req.user ? req.user._id : req.session.user._id;
    const fetchedLegal = await LegalQuestion.findOne({userId: user_id});
    if(fetchedLegal){
        fetchedLegal.company_start_date = req.body.company_start_date;
        fetchedLegal.legal_entity = req.body.legal_entity;
        fetchedLegal.cin = req.body.cin;
        fetchedLegal.ext_advisor = req.body.ext_advisor;
        fetchedLegal.kind_of_ip = req.body.kind_of_ip;
        fetchedLegal.ip_status = req.body.ip_status;
        fetchedLegal.save();
    }else{
        const newLegal = new LegalQuestion({
            userId:user_id,
            company_start_date : req.body.company_start_date,
            legal_entity : req.body.legal_entity,
            cin : req.body.cin,
            ext_advisor : req.body.ext_advisor,
            kind_of_ip : req.body.kind_of_ip,
            ip_status : req.body.ip_status,
        });
        await newLegal.save();
    }
    res.redirect('/legal_questionnaire')
});
router.get('/market_questionnaire',async(req,res)=>{
    const profileDetail = await User.findOne({_id:req.user ? req.user._id : req.session.user._id});
    const user_id = req.user ? req.user._id : req.session.user._id;
    const marketData = await MarketQuestion.findOne({userId: user_id});
    res.render('./questionnaire/market-question.ejs',{
        marketData,profileDetail
    })
});
router.post('/market_questionnaire',async(req,res)=>{
    const user_id = req.user ? req.user._id : req.session.user._id;
    const fetchedMarket = await MarketQuestion.findOne({userId: user_id});
    if(fetchedMarket){
        fetchedMarket.tam_size = req.body.tam_size;
        fetchedMarket.growth_rate = req.body.growth_rate;
        fetchedMarket.entry_barrier = req.body.entry_barrier;
        fetchedMarket.competition_level = req.body.competition_level;
        fetchedMarket.competitive_service = req.body.competitive_service;
        fetchedMarket.your_service = req.body.your_service;
        fetchedMarket.test_customer_demand = req.body.test_customer_demand;
        fetchedMarket.feedback = req.body.feedback;
        fetchedMarket.customer_loyalty = req.body.customer_loyalty;
        fetchedMarket.partner_relation = req.body.partner_relation;
        fetchedMarket.save()
    }else{
        const newMarket = new MarketQuestion({
            userId:user_id,
            tam_size : req.body.tam_size,
            growth_rate : req.body.growth_rate,
            entry_barrier : req.body.entry_barrier,
            competition_level : req.body.competition_level,
            competitive_service : req.body.competitive_service,
            your_service : req.body.your_service,
            test_customer_demand : req.body.test_customer_demand,
            feedback : req.body.feedback,
            customer_loyalty : req.body.customer_loyalty,
            partner_relation : req.body.partner_relation,
        });
        await newMarket.save();
    }
    res.redirect('/market_questionnaire')
});

module.exports = router;