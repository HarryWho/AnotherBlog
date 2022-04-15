const mongoose = require('mongoose')

const SettingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  layout: {
    type: String,
    default: 'sidebar-mini',
    enum: [
      'fixed',
      'layout-boxed',
      'sidebar-collapse',
      'sidebar-mini',
      'layout-top-nav'
    ]
  },
  skin: {
    type: String,
    default: 'skin-green'
  },
  sidebar: {
    type: String,
    default: 'control-sidebar-dark'
  }

})

module.exports = mongoose.model("Setting", SettingSchema)