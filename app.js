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
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const tableData = require('./constants') ;



const app = express();

app.set('view engine', 'ejs');
app.set('x-powered-by', false);

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(()=>console.log('MongoDB is connected !'))
.catch(err=>console.log(err))

const sessionStore = new MongoStore({
  mongooseConnection:mongoose.connection,
  collection:'sessions'
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  name:'sid',
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:sessionStore,
  cookie:{
    httpOnly:true,
    maxAge:1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

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
    res.render("landing");
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
  const email = req.session.username;
    User.find({ username: email}, function(err, email){
      res.render("user", {
        username: email
        });
    });
  });

app.get("/dashboard", function(req, res){
    res.render("dashboard",{user:req.user});
  });

app.use('/questionnaire', require('./routes/question-route'));
app.use('/funds' , require('./routes/funds-route')) ;


app.get('/financial', (req,res)=>{
  res.render("Financials" , {tableData: tableData} ) ;
})

// const USER = require('./models/User');
app.post("/register",async function(req, res){
  let registerErrors = [];
  const {username,password,conf_password}=req.body;
  if(!username || !password || !conf_password){
    registerErrors.push({msg:'Fill the empty field !'})
  }
  if(password.length < 8){
    registerErrors.push({msg:'Password must be 8 character !'})
  }
  if(password !== conf_password){
    registerErrors.push({msg:'Password not matched !'})
  }
  if(registerErrors.length > 0){
    res.render('landing',{registerErrors})
  }
  else{
    const fetchUser = await User.findOne({ username: username });
    if (fetchUser) {
      registerErrors.push({msg:`${username} is already exist !`});
      res.render('landing', { registerErrors, username });
    }else{
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt);
      const newUser = await new User({
        username:username,
        password:hashedPass
      });
      await newUser.save();
      req.session.user = newUser;
      console.log(req.session);
      res.redirect('/dashboard');
    }
}
});

app.post("/login",async function(req, res){
  let loginErrors = [];
  const {username,password}=req.body;
  if(!username || !password){
    loginErrors.push({msg:'Fill the empty field !'})
  }
  if(password.length < 8){
    loginErrors.push({msg:'Password must be 8 character !'})
  }
  if(loginErrors.length > 0){
    res.render('landing',{loginErrors})
  }
  else{
    const fetchUser = await User.findOne({ username: username });
        if (!fetchUser) {
          loginErrors.push({msg:`${username} is not registered yet !`});
          res.render('landing', { loginErrors, username });
        }
        else {
            const validPass = await bcrypt.compare(password, fetchUser.password);
            if (!validPass) {
              loginErrors.push({msg:'Check ur password !'});
              res.render('landing', { loginErrors, username });
            }
            else {
                req.session.user = fetchUser;
                console.log(req.session);
                res.redirect('/dashboard');
            }
        }
  }
});



app.listen(process.env.PORT || 3000, function(){

    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
