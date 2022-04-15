const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
passport.use(new LocalStrategy({ usernameField: 'email', },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {

      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password).then((res) => {
        if (!res) { return done(null, false); }
        return done(null, user);
      });

    });
  }
));