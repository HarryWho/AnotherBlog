const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  displayName: String,
  email: String,
  location: String,
  occupation: String,
  education: String,
  skills: [String]
})

module.exports = mongoose.model('Profile', ProfileSchema)