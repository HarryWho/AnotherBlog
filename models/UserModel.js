const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  displayName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/dist/img/avatar.png',
    required: true
  },
  role: {
    type: String,
    default: 'basic'
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setting'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
  }
})

module.exports = mongoose.model('User', UserSchema)