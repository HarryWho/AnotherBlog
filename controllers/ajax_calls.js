const express = require('express')
const app = express()
const router = express.Router();
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
const fs = require('fs')
const fileUpload = require('express-fileupload');


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

router.post('/getmodal', (req, res) => {

  const m = fs.readFileSync(req.body.path, { encoding: 'utf8', flag: 'r' })

  res.send(m);
})
router.post('/upload', async(req, res) => {

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;
      console.log(avatar)
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./img/' + avatar.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})
module.exports = router;