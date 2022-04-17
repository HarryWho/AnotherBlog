const { GetSettings, GetProfile, GetArticles } = require('./functions')
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
      })
    })
  }
}