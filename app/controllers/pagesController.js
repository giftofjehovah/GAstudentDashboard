var locomotive = require('locomotive')
var Controller = locomotive.Controller
var Language = require('../models/language')
var User = require('../models/user')

var pagesController = new Controller()

pagesController.before('dashboard', function (next) {
  if (this.req.user) {
    if (this.req.user.role === 'student') {
      return next()
    } else {
      this.redirect('/admin')
    }
  }
  this.redirect('login')
})

pagesController.before('admin', function (next) {
  if (this.req.user) {
    if (this.req.user.role === 'admin') {
      return next()
    } else {
      this.redirect('/dashboard')
    }
  } else {
    this.redirect('login')
  }
})

pagesController.admin = function () {
  User.find({role: 'student'}, (err, users) => {
    if (err) throw err
    this.users = users
    Language.find({}, (err, languages) => {
      if (err) throw err
      this.languages = languages
      this.user = this.req.user
      this.render()
    })
  })
}

pagesController.main = function () {
  this.title = 'Locomotive'
  this.render()
}

pagesController.login = function () {
  this.errorMsg = this.req.flash('errorMessage')
  this.render()
}

pagesController.signup = function () {
  this.errorMsg = this.req.flash('errorMessage')
  this.render()
}

pagesController.dashboard = function (data) {
  var language
  this.user = this.req.user
  Language.find({}, (err, languages) => {
    if (err) throw err
    this.req.user.checkLanguage(languages, (user) => {
      language = user.languages
      this.languages = language
      this.render()
    })
  })
}

module.exports = pagesController
