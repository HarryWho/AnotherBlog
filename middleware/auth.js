module.exports = {
  ensureGuest: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/dashboard');
  },
  ensureAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}