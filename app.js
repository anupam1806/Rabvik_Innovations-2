const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));



app.get("/", function(req, res){
    res.render("landing");
  });

app.get("/user", function(req, res){
    res.render("user");
  });

app.get("/dashboard", function(req, res){
    res.render("dashboard");
});


app.use('/questionnaire', require('./routes/question-route'));


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });