const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('pages/login')
  } else {
    res.redirect('/dashboard')
  }
})



router.get('/register', (req, res) => {
  res.render('pages/register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;