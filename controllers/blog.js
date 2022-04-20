const express = require('express')
const router = express.Router()

const { GetArticle } = require('../middleware/functions')
const { GetSettingsProfileArticles, GetNotificationsMessagesTasks, GetSettingsProfile } = require('../middleware/function_caller')
router.get('/', (req, res) => {

  GetSettingsProfileArticles(req.user, { status: 'public' }, (settings, profile, articles) => {
    GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
      res.render('pages/blog', {
        user: req.user,
        profile: profile,
        settings: settings,
        articles: articles,
        title: 'Blog',
        messages: messages,
        notifications: notifications,
        tasks: tasks
      })
    })
  })
})

router.get('/view/:articleID', (req, res) => {

  GetSettingsProfile(req.user, (settings, profile) => {
    GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
      GetArticle({ _id: req.params.articleID }).then((article) => {
        res.render('pages/article', {
          user: req.user,
          profile: profile,
          settings: settings,
          article: article,
          title: 'Blog',
          messages: messages,
          notifications: notifications,
          tasks: tasks
        })
      })
    })
  })
})


module.exports = router