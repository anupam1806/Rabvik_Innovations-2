const mongoose = require('mongoose');

const Funds = new mongoose.Schema({
    userId : {
        type : String , 
        required : true 
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
    }
});

module.exports = mongoose.model('funds', Funds);