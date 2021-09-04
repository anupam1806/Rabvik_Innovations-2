const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password: {
        type:String
    },
    googleId:{
        type:String
    },
    companyName:{
        type:String
    },
    email:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    image:{
        type:String
    },
    issuedAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("user", UserSchema);