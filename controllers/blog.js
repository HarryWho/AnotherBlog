const express = require('express')
const router = express.Router()
const Setting = require('../models/SettingModel')
const Profile = require('../models/ProfileModel')
router.get('/', async(req, res) => {
  const settings = await Setting.findOne({ _id: req.user.settings })
  const profile = await Profile.findOne({ user: req.user._id })
  res.render('pages/blog', { user: req.user, profile: profile, settings: settings })
})


module.exports = router