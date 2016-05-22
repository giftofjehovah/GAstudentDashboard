var locomotive = require('locomotive')
var Controller = locomotive.Controller
var passport = require('passport')

var authController = new Controller()

authController.before('login', passport.authenticate('local-login', {failureRedirect: '/login',
                                                                        failureFlash: true,
                                                                        successRedirect: '/dashboard'}))

authController.login = function () {
}

authController.logout = function () {
  this.req.session.destroy()
  this.redirect('/login')
}

module.exports = authController
