const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  dateDue: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})