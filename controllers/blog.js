const express = require('express')
const router = express.Router()

const { GetSettings, GetProfile, GetArticles } = require('../middleware/functions')
router.get('/', (req, res) => {
  GetSettings(req.user).then((settings) => {
    GetProfile(req.user).then((profile) => {
      GetArticles({ status: 'public' }).then((articles) => {
        res.render('pages/blog', { user: req.user, profile: profile, settings: settings, articles: articles, title: 'Blog' })
      })
    })
  })
})


module.exports = router