var locomotive = require('locomotive')
var Controller = locomotive.Controller

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
  console.log(this.req.user)
  this.render()
}

module.exports = pagesController
