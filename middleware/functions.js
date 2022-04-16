const express = require('express')
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
const Article = require('../models/ArticleModel')
const Comment = require('../models/CommentModel')

module.exports = {
  GetProfile: function(user, next) {
    Profile.findOne(user._id).then((err, profile) => {
      if (err) return next(err, null)
      return next(profile)
    })


  }


}