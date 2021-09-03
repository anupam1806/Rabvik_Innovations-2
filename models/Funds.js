const mongoose = require('mongoose');

const Funds = new mongoose.Schema({
    userId : {
        type : String , 
        required : true 
    },
    "totalFunds" : {
        type : String , 
    },
    "Product and R&D" : {
        type : String
    },
    "Sales and Marketing" : {
        type : String
    },
    "Inventory" : {
        type : String
    },
    "Operations" : {
        type : String
    },
    "Capital Expenditures" : {
        type : String
    },
    "Others" : {
        type : String
    },
    "Past Funds" : { 
        type : {
            "Equity" :{
                type : String
            },
            "Capital Raised" :{
                type : String
            },
            "Valuation" :{
                type : String
            },
            "Closed Date" :{
                type : String
            }
        }
    }
});


module.exports = mongoose.model('funds', Funds);