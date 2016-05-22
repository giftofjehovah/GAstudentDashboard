var locomotive = require('locomotive')
var Controller = locomotive.Controller
var passport = require('passport')
var User = require('../models/user')

var usersController = new Controller()

usersController.after('*', function (err, req, res, next) {
  this.render('error', { message: err.message })
})

usersController.before('create', passport.authenticate('local-signup', {failureRedirect: '/signup',
                                                                        failureFlash: true,
                                                                        successRedirect: '/dashboard'}))

usersController.create = function () {

}

usersController.toggleTopic = function () {
  var data = this.param('data')
  User.findById(data.userId, (err, user) => {
    if (err) throw err
    user.topicNotGrasp[data.language].forEach((topic) => {
      if (topic.hasOwnProperty(data.topic)) {
        if (topic[data.topic] === 'true') {
          topic[data.topic] = 'false'
        } else {
          topic[data.topic] = 'true'
        }
        user.markModified('topicNotGrasp')
      }
    })
    user.save((err, user) => {
      if (err) throw err
      this.res.json({user: user})
    })
  })
}

usersController.editLanguage = function () {
  var data = this.param('data')
  User.findById(data.userId, (err, user) => {
    if (err) throw err
    user.languages[data.language] = data.amount
    user.markModified('languages')
    user.save((err, user) => {
      if (err) throw err
      this.res.json({user: user})
    })
  })
}

usersController.addTopicNotGrasp = function () {
  var data = this.param('data')
  User.findById(data.userId, (err, user) => {
    if (err) throw err
    user.addTopicNotGrasp(data, (topic) => {
      this.res.json({user: topic})
    })
  })
}

module.exports = usersController
