const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  userTo: {
    type: String,
    required: true
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Notification', NotificationSchema)