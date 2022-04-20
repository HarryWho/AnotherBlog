const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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

module.exports = mongoose.model('Task', TaskSchema)