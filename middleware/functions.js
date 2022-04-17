const express = require('express')
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
const Article = require('../models/ArticleModel')
const Comment = require('../models/CommentModel')
const User = require('../models/UserModel')

module.exports = {
  GetSettings: function(user) {
    return new Promise((resolve, reject) => {
      Setting.findOne({ _id: user.settings }).then((settings) => {
        resolve(settings)
      })
    })
  },
  GetProfile: function(user) {

    return new Promise((resolve, reject) => {
      Profile.findOne({ user: user._id }).then((profile) => {

        resolve(profile)
      })
    })

  },
  GetArticles: function(which_articles) {
    return new Promise((resolve, reject) => {
      Article.find(which_articles).sort({ date: 'desc' })
        .populate([{
          path: 'author',
          select: ['displayName', 'image']
        }, {
          path: 'likes',
          select: ['displayName', 'image']
        }, {
          path: 'comments',
          populate: [{
            path: 'author',
            select: ['displayName', 'image']
          }]
        }]).then((articles) => {
          resolve(articles)
        })
    })
  },
  SaveNewArticle: function(body) {
    return new Promise((resolve) => {
      const article = new Article(body)
      article.save((err) => {
        if (err) resolve(err, false)
        resolve(null, true)
      })
    })
  },
  GetArticle: function(which_article) {
    return new Promise((resolve, reject) => {
      Article.findOne(which_article).then((article) => {
        resolve(article)
      })
    })
  },
  SaveComment: function(body) {
    return new Promise((resolve) => {
      const comment = new Comment(body)
      comment.save((err) => {
        if (!err) resolve(comment)
      })
    })
  }
}