const mongoose = require('mongoose');
const MarketQuestionSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    tam_size:{
        type: String
    },
    growth_rate:{
        type:Number
    },
    entry_barrier:{
        type:Number
    },
    competition_level:{
        type:Number
    },
    competitive_service:{
        type:Number
    },
    your_service:{
        type:Number
    },
    test_customer_demand:{
        type:Number
    },
    feedback:{
        type:Number
    },
    customer_loyalty:{
        type:Number
    },
    partner_relation:{
        type:Number
    },
});
module.exports = mongoose.model('marketQuestion',MarketQuestionSchema);