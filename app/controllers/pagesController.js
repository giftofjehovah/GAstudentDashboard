var locomotive = require('locomotive')
var Controller = locomotive.Controller
var Language = require('../models/language')

var pagesController = new Controller()

pagesController.before('dashboard', function (next) {
  if (this.req.user) return next()
  this.redirect('login')
})

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
      console.log(user.languages)
      language = user.languages
      this.languages = language
      this.render()
    })
  })
}

module.exports = pagesController
