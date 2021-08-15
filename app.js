require('dotenv').config({path:__dirname+'/.env'})
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;



const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGO_URI_LOCAL,
 {useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true},
 ()=>console.log('MongoDB is connected !'));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  outlookId: String,
  name: String,
  profile: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/dashboard",
  // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  // passReqToCallback: true
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/outlook/dashboard',
  passReqToCallback: true
},
function(accessToken, refreshToken, profile, done) {
  var user = {
    outlookId: profile.id,
    name: profile.DisplayName,
    email: profile.EmailAddress,
    accessToken:  accessToken
  };
  if (refreshToken)
    user.refreshToken = refreshToken;
  if (profile.MailboxGuid)
    user.mailboxGuid = profile.MailboxGuid;
  if (profile.Alias)
    user.alias = profile.Alias;
  User.findOrCreate(user, function (err, user) {
    return done(err, user);
  });
}
));

app.get("/", function(req, res){
    res.render("login");
  });

  app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get("/auth/google/dashboard",
  passport.authenticate('google', { failureRedirect: "/" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/dashboard");
  });

app.get('/auth/outlook',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

app.get('/auth/outlook/dashboard', 
  passport.authenticate('windowslive', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

app.get("/user", function(req, res){
    res.render("user");
  });

app.get("/dashboard", function(req, res){
    res.render("dashboard",{user:req.user});
  });

app.use('/questionnaire', require('./routes/question-route'));



app.get('/financial', (req,res)=>{
  res.render("Financials" ) ;
})

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("dashboard" );
      });
    }
  });

});

app.post("/log", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.redirect("/")
    } else {
      passport.authenticate("local")(req, res, function(){
        res.render("dashboard");
      });
    }
  });

});



app.listen(process.env.PORT || 3000, function(){

    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
