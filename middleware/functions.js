const express = require('express')
const Profile = require('../models/ProfileModel')
const Setting = require('../models/SettingModel')
const Article = require('../models/ArticleModel')
const Comment = require('../models/CommentModel')
const Message = require('../models/MessageModel')
const Notification = require('../models/NotificationModel')
const Task = require('../models/TaskModel')
const User = require('../models/UserModel')

module.exports = {
  GetUser: function(userID) {
    return new Promise((resolve) => {
      User.findById(userID).then((user) => {
        resolve(user)
      })
    })
  },
  GetTasks: function(user) {
    return new Promise((resolve, reject) => {
      Task.find({ user: user._id }).then((notification) => {
        resolve(notification)
      })
    })
  },
  GetMessages: function(user) {
    return new Promise((resolve, reject) => {
      Message.find({ userTo: user._id })
        .populate({
          path: 'userFrom',
          select: ['displayName', 'image']
        }).then((messages) => {
          resolve(messages)
        })
    })
  },
  GetNotifications: function(user) {
    return new Promise((resolve, reject) => {

      Notification.find({ userTo: user._id })
        .populate({
          path: 'userFrom',
          select: ['displayName', 'image']
        }).then((notifications) => {

          resolve(notifications)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
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
      }).catch((err) => {
        reject(err)
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
      Article.findOne(which_article)
        .populate([{
          path: 'likes',
          select: ['displayName']
        }, { path: 'author', select: ['displayName', 'image'] }, { path: 'comments', populate: 'author' }])
        .then((article) => {
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
  },
  SaveNotification: function(article, user) {
    return new Promise((resolve) => {
      if (article.author.displayName != user.displayName) {
        const notification = new Notification({
          userTo: article.author._id,
          userFrom: user._id,
          message: `${user.displayName} has liked your article`,
          articleId: article._id
        })
        notification.save((notification) => {
          resolve(notification)
        })
      } else {
        resolve(null)
      }
    })
  }
}