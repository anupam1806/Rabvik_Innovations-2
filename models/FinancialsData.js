const mongoose = require('mongoose');

const FinancialsSchema = new mongoose.Schema({
    userId : {
        type : String ,
        required : true 
    },
    Revenues : {
        type : [String] 
    },
    'Cost Of Goods' : {
        type : [String] 
    },
    Salaries : {
        type : [String] 
    },
    "Operation Cost" : {
        type : [String] 
    },
    EBITDA : {
        type : [String] 
    },
    "D&A" : {
        type : [String]
    },
    EBIT : {
        type : [String]
    },
    Interest : {
        type : [String]
    },
    Taxes : {
        type : [String]
    },
    "Net Profit" : {
        type : [String]
    },
    Recieveables : {
        type : [String]
    },
    Inventory : {
        type : [String]
    },
    Payables : {
        type : [String]
    },
    "Working Capital" : {
        type : [String]
    },
    "Capital Expenditures" : {
        type : [String]
    },
    "Debt at the end of the year" : {
        type : [String]
    },
    "Change in outstanding debt" : {
        type : [String]
    },
    "Future Funding" : {
        type : [String]
    },
    "Free cash flow" : {
        type : [String]
    },
    "Cash and equivalents" : {
        type : String
    },
    "Tangible Assets" : {
        type : String
    },
    "Intangible Assets" : {
        type : String
    },
    "Financial Assets" : {
        type : String
    },
    "Differed Tax Assets" : {
        type : String
    },
    "Debts due within one year time" : {
        type : String
    },
    "Debts due beyond one year time" : {
        type : String
    },
    "Equity" : {
        type : String
    }
});

module.exports = mongoose.model('financials', FinancialsSchema);