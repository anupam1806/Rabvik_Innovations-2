const mongoose = require('mongoose');

const FinancialsSchema = new mongoose.Schema({
    userId : {
        type : String ,
        required : true 
    },
    Revenues : {
        type : [Number] 
    },
    'Cost Of Goods' : {
        type : [Number] 
    },
    Salaries : {
        type : [Number] 
    },
    "Operation Cost" : {
        type : [Number] 
    },
    EBITDA : {
        type : [Number] 
    },
    "D&A" : {
        type : [Number]
    },
    EBIT : {
        type : [Number]
    },
    Interest : {
        type : [Number]
    },
    Taxes : {
        type : [Number]
    },
    "Net Profit" : {
        type : [Number]
    },
    Recieveables : {
        type : [Number]
    },
    Inventory : {
        type : [Number]
    },
    Payables : {
        type : [Number]
    },
    "Working Capital" : {
        type : [Number]
    },
    "Capital Expenditures" : {
        type : [Number]
    },
    "Debt at the end of the year" : {
        type : [Number]
    },
    "Change in outstanding debt" : {
        type : [Number]
    },
    "Future Funding" : {
        type : [Number]
    },
    "Free cash flow" : {
        type : [Number]
    },
    "Cash and equivalents" : {
        type : [Number]
    },
    "Tangible Assets" : {
        type : [Number]
    },
    "Financial Assets" : {
        type : [Number]
    },
    "Differed Tax Assets" : {
        type : [Number]
    },
    "Debts due within one year time" : {
        type : [Number]
    },
    "Debts due beyond one year time" : {
        type : [Number]
    },
    "Equity" : {
        type : [Number]
    }
});

module.exports = mongoose.model('financials', FinancialsSchema);