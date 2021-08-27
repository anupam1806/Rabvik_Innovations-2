const mongoose = require('mongoose');
const BusinessQuestionSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    description:{
        type: String
    },
    service_concept:{
        type:Number
    },
    market_fit:{
        type:Number
    },
    scalable:{
        type:Number
    },
    business_model:{
        type:Number
    },
    dev_stage:{
        type:Number
    },
    breakeven:{
        type:Number
    },
});
module.exports = mongoose.model('businessQuestion',BusinessQuestionSchema);