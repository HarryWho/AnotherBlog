const {
  GetSettings,
  GetProfile,
  GetArticles,
  GetNotifications,
  GetMessages,
  GetTasks,
  GetUser
} = require('./functions')
module.exports = {
  GetSettingsProfileArticles: function(user, which_articles, done) {
    GetSettings(user).then((settings) => {
      GetProfile(user).then((profile) => {
        GetArticles(which_articles).then((articles) => {
          return done(settings, profile, articles)
        })
      })
    })
  },
  GetSettingsProfile: function(user, done) {
    GetSettings(user).then((settings) => {
      GetProfile(user).then((profile) => {
        return done(settings, profile)
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  GetNotificationsMessagesTasks: function(user, done) {
    GetNotifications(user).then((notifications) => {
      GetMessages(user).then((messages) => {
        GetTasks(user).then((tasks) => {

          return done(messages, notifications, tasks)
        })
      })
    })
  },
  GetUser: function(userID, done) {
    GetUser(userID).then((user) => {
      return done(user)
    })
  }
}