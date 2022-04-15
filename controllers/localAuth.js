const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/UserModel')
const Setting = require('../models/SettingModel')
const Profile = require('../models/ProfileModel')
const bcrypt = require('bcryptjs')
const local = require('../config/localAuth')
const { validate } = require('../middleware/validate');

router.post('/', (req, res) => {
  validate(req.body, (errors) => {
    if (errors.length > 0) {
      res.render('pages/register', { errors: errors, fields: req.body })
    } else {
      const setting = new Setting()
      setting.save((err) => {
        if (!err) {
          const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
            settings: setting._id
          })
          user.save((err) => {
            const profile = new Profile({ user: user._id, displayName: user.displayName, email: user.email })
            profile.save((err) => {
              res.redirect('/')
            })
          });
        }

      })
    }
  })
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router