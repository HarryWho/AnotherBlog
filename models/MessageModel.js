const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Message', MessageSchema)