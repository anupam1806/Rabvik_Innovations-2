const mongoose = require('mongoose');
const LegalQuestionSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    company_start_date:{
        type: String
    },
    legal_entity:{
        type:Number
    },
    cin:{
        type:String
    },
    ext_advisor:{
        type:Number
    },
    kind_of_ip:{
        type:Number
    },
    ip_status:{
        type:Number
    }
});
module.exports = mongoose.model('legalQuestion',LegalQuestionSchema);