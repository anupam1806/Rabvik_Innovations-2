const mongoose = require('mongoose');
const GenericQuestionSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    sector: {
        type: String
    },
    business: {
        type: String
    },
    market: {
        type: String
    },
    stage: {
        type: String
    },
    service: {
        type: String
    },
    mission: {
        type: String
    },
    founderNum: {
        type: Number
    },
    founders: {
        type: []
    },
    employeeNum: {
        type: Number
    },
    employees: {
        type: []
    },
    commited_capital: {
        type: Number
    },
    target_funding: {
        type: Number
    },
    owner_name: {
        type: String
    },
    owner_percentage: {
        type: Number
    },
    past_owner: {
        type: String
    },
    past_percentage: {
        type: Number
    },
    
});
module.exports = mongoose.model('genericQuestion',GenericQuestionSchema)