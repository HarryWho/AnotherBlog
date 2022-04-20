const express = require('express')
const router = express.Router()
const { GetSettingsProfile, GetNotificationsMessagesTasks } = require('../middleware/function_caller')
router.get('/', (req, res) => {
  GetSettingsProfile(req.user, (settings, profile) => {
    GetNotificationsMessagesTasks(req.user, (messages, notifications, tasks) => {
      res.render('pages/calendar', {
        user: req.user,
        settings,
        profile,
        messages,
        notifications,
        tasks,
        title: 'Calendar'

      })
    })
  })
})




module.exports = router;