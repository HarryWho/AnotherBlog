const express = require('express')
const router = express.Router();
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
const Article = require('../models/ArticleModel')
const Comment = require('../models/CommentModel')
router.get('/', async(req, res) => {
  const profile = await Profile.findOne({ user: req.user._id })
  const settings = await Setting.findOne({ _id: req.user.settings })
  const articles = await Article.find({ author: req.user._id }).sort({ date: 'desc' })
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
  res.render('pages/profile', {
    user: req.user,
    profile: profile,
    settings: settings,
    articles: articles
  })
})

router.get('/new', async(req, res) => {
  const profile = await Profile.findOne({ user: req.user._id })
  const settings = await Setting.findOne({ _id: req.user.settings })
  res.render('pages/editor', {
    user: req.user,
    profile: profile,
    settings: settings,
    action: '/dashboard',
    caption: 'Save'
  })
})

router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findById(req.params.articleID);
  const profile = await Profile.findOne({ user: req.user._id })
  const settings = await Setting.findOne({ _id: req.user.settings })
  res.render('pages/editor', {
    user: req.user,
    profile: profile,
    settings: settings,
    article: article,
    action: `/dashboard/edit/${article._id}?_method=PUT`,
    caption: 'Update'
  })
})
router.put('/edit/:articleID', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.articleID, req.body)
  res.redirect('/dashboard')
})
router.post('/', (req, res) => {
  const article = new Article(req.body)
  article.save((err) => {
    res.redirect('/dashboard')
  })
})

module.exports = router