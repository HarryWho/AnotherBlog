const express = require('express');

const router = express.Router();
const Profile = require('../models/ProfileModel');
const Setting = require('../models/SettingModel');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const Article = require('../models/ArticleModel');
const { GetArticle, SaveComment, SaveNotification } = require('../middleware/functions');
const { formatDate } = require('../middleware/formats')
router.post('/comment', (req, res) => {
  req.body.author = req.user._id
  SaveComment(req.body).then((comment) => {
    Article.findByIdAndUpdate(req.body.articleID, { $push: { comments: comment._id } }).then(() => {
      res.send(`<div class="box-comment">
      <!-- User image -->
      <img class="img-circle img-sm" src="${req.user.image}" alt="User Image">
      <div class="comment-text">
        <span class="username">
        ${req.user.displayName}
        <span class="text-muted pull-right">${formatDate(comment.date, 'MMMM Do YYYY')}</span>
        </span>
        <!-- /.username -->
        ${req.body.comment}
      </div>
      <!-- /.comment-text -->
    </div>
    <!-- /.box-comment -->`)
    })
  })
})
router.put('/profile', async(req, res) => {

  let profile = await Profile.findOneAndUpdate({ user: req.user._id }, {
    location: req.body.location,
    occupation: req.body.occupation,
    education: req.body.education,
    skills: req.body.skills.split(',')
  })

  res.send('saved form data')

})

router.put('/settings', (req, res) => {

  Setting.findByIdAndUpdate(req.user.settings, req.body, (err) => {

    res.send('setting saved')
  })
})

router.post('/getmodal', (req, res) => {

  const m = fs.readFileSync(req.body.path, { encoding: 'utf8', flag: 'r' })

  res.send(m);
})
router.post('/upload', async(req, res) => {

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.file;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./public/img/' + avatar.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})



router.put('/liked', (req, res) => {

  GetArticle({ _id: req.body.articleID }).then(async(article) => {
    let response = ''
    if (article.likes.some((e) => e.displayName === req.user.displayName)) {
      await Article.findByIdAndUpdate(req.body.articleID, { $pull: { likes: req.user._id } })
      res.send("unliked")
    } else {

      SaveNotification(article, req.user).then((notification) => {
        Article.findByIdAndUpdate(req.body.articleID, { $push: { likes: req.user._id } }).then(() => {
          res.send('liked')
        })

      })
    }
  })
})



module.exports = router;