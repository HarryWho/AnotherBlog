const express = require('express')
const router = express.Router()
const Setting = require('../models/SettingModel')
const Profile = require('../models/ProfileModel')
const Article = require('../models/ArticleModel')
router.get('/', async(req, res) => {
  const settings = await Setting.findOne({ _id: req.user.settings })
  const profile = await Profile.findOne({ user: req.user._id })
  const articles = await Article.find({ status: 'public' }).sort({ date: 'desc' })
    .populate([{
      path: 'author',
      select: ['displayName', 'image']
    }, {
      path: 'likes',
      select: ['displayName', 'image']
    }, {
      path: 'comments',
      populate: [{
        path: 'author',
        select: ['displayName', 'image']
      }]
    }])
  res.render('pages/blog', { user: req.user, profile: profile, settings: settings, articles: articles })
})


module.exports = router