const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OutlookStrategy = require('passport-outlook2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/dashboard",
  },
  async function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
          const existUser = await User.findOne({googleId:profile.id});
          if(existUser){
            done(null,existUser);
          }else{
            const newUser = new User({
                googleId:profile.id,
                companyName:profile.displayName,
                email:profile.email,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                image:profile.photos[0].value,
            });
            await newUser.save();
            done(null,newUser);
          }
      } catch (error) {
          console.log(error);
      }
      
  }
));

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/outlook/dashboard',
  passReqToCallback: true
},
function(req, token, refreshToken, profile, done) {
    console.log(profile);
    var userid = req.user;
    User.findById(userid, function (err, user) {
        if (err || !user){
            console.log("db err")
            return done(null, false);
        } else {
            if (profile.EmailAddress){
                user.outlook.email = profile.EmailAddress;
                user.outlook.token=token;
                user.outlook.refreshToken=refreshToken;
                if (profile.MailboxGuid){
                    user.outlook.mailboxGuid = profile.MailboxGuid;
                }
                if (profile.Alias){
                    user.outlook.alias = profile.Alias;
                }
                if (profile.Id){
                user.outlook.id = profile.Id

                }
                user.save(function(err){
                    if (err){
                        return done(null, false, req.flash('message', 'DB error'));
                    } else {
                        return done(null, user);
                    }
                });
            } else {
                return done(null, false, req.flash('message', 'No email account detected with this account.'));
            }
        }
        }
    )
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    });
});
