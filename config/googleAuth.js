const GoogleStrategy = require('passport-google-oauth2').Strategy;
const res = require('express/lib/response');
const passport = require('passport')
const User = require('../models/UserModel')
const Setting = require('../models/SettingModel')
const Profile = require('../models/ProfileModel')
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {

    User.findOne({ googleId: profile.id }, function(err, user) {

      if (!err && user !== null) {

        done(err, user);
      } else {
        const setting = new Setting()
        setting.save((err) => {
          if (!err) {
            const user = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
              image: profile.picture,
              settings: setting._id
            })
            user.save((err) => {
              if (err) {
                return done(err, false); // handle errors!
              } else {
                const profile = new Profile({ user: user._id, displayName: user.displayName, email: user.email })
                profile.save((err) => {
                  if (err) return done(err, false)
                  return done(null, user);
                })
              }
            });
          }
        })

      }

    });
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});