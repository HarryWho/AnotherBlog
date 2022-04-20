const express = require('express')
const router = express.Router();
const { GetSettingsProfile, GetNotificationsMessagesTasks, GetUser } = require('../middleware/function_caller')
const { ConnectIMAP } = require('../config/imap')

router.get('/', (req, res) => {
  GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
    GetSettingsProfile(req.user, (settings, profile) => {
      res.render('pages/mailbox/mailbox', {
        user: req.user,
        settings: settings,
        profile: profile,
        messages: messages,
        notifications: notifications,
        tasks: tasks,
        title: 'Mailbox'
      })
    })
  })
})
router.get('/read', (req, res) => {
  GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
    GetSettingsProfile(req.user, (settings, profile) => {
      res.render('pages/mailbox/read-mail', {
        user: req.user,
        settings: settings,
        profile: profile,
        messages: messages,
        notifications: notifications,
        tasks: tasks,
        title: 'Compose Email'
      })
    })
  })
})
router.get('/compose', (req, res) => {
  GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
    GetSettingsProfile(req.user, (settings, profile) => {
      res.render('pages/mailbox/compose', {
        user: req.user,
        settings: settings,
        profile: profile,
        messages: messages,
        notifications: notifications,
        tasks: tasks,
        title: 'Compose Email'
      })
    })
  })
})

router.get('/compose/:toID', (req, res) => {
  GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
    GetSettingsProfile(req.user, (settings, profile) => {
      GetUser(req.params.toID, (userTo) => {
        res.render('pages/mailbox/compose', {
          user: req.user,
          settings: settings,
          profile: profile,
          messages: messages,
          notifications: notifications,
          tasks: tasks,
          userTo: userTo,
          title: 'Compose Email'
        })
      })
    })
  })
})

router.get('/imap', (req, res) => {
  ConnectIMAP()
})

module.exports = router