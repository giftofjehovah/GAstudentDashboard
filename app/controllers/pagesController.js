var locomotive = require('locomotive')
var Controller = locomotive.Controller

var pagesController = new Controller()

pagesController.main = function () {
  this.title = 'Locomotive'
  this.render()
}

pagesController.login = function () {
  this.title = 'Login'
  this.render()
}
module.exports = pagesController
