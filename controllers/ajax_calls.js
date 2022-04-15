const express = require('express')
const router = express.Router();
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
router.put('/profile', async(req, res) => {

  let profile = await Profile.findOneAndUpdate({ user: req.user._id }, {
    location: req.body.location,
    occupation: req.body.occupation,
    education: req.body.education,
    skills: req.body.skills.split(',')
  })

  res.send('saved form data')

})

router.put('/settings', (req, res) => {

  Setting.findByIdAndUpdate(req.user.settings, req.body, (err) => {

    res.send('setting saved')
  })
})

module.exports = router;