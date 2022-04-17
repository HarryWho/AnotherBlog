const express = require('express')
const router = express.Router();

const Article = require('../models/ArticleModel')

const { SaveNewArticle } = require('../middleware/functions')
const { GetSettingsProfileArticles, GetSettingsProfile } = require('../middleware/function_caller')
router.get('/', (req, res) => {
  GetSettingsProfileArticles(req.user, { author: `${req.user._id}` }, (settings, profile, articles) => {
    res.render('pages/profile', {
      user: req.user,
      profile: profile,
      settings: settings,
      articles: articles
    })
  })
})


router.get('/new', (req, res) => {
  GetSettingsProfile(req.user, (settings, profile) => {
    res.render('pages/editor', {
      user: req.user,
      profile: profile,
      settings: settings,
      action: '/dashboard',
      caption: 'Save',
      title: 'Create New Article'
    })
  })
})

router.get('/edit/:articleID', (req, res) => {
  GetSettingsProfileArticles(req.user, { _id: `${req.params.articleID}` }, (settings, profile, articles) => {
    res.render('pages/editor', {
      user: req.user,
      profile: profile,
      settings: settings,
      article: articles[0],
      action: `/dashboard/edit/${articles[0]._id}?_method=PUT`,
      caption: 'Update',
      title: 'Edit Article'
    })
  })

})

router.put('/edit/:articleID', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.articleID, req.body)
  res.redirect('/dashboard')
})

router.post('/', (req, res) => {
  SaveNewArticle(req.body).then((err, isSaved) => {
    if (!err) {
      res.redirect('/dashboard')
    } else {
      res.redirect('/dashboard/new')
    }
  })
})

router.delete('/delete/:articleID', async(req, res) => {
  await Article.findByIdAndDelete(req.params.articleID)
  res.redirect('/dashboard')
})

module.exports = router