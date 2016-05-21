var locomotive = require('locomotive')
var Controller = locomotive.Controller
var passport = require('passport')

var authController = new Controller()

authController.before('login', passport.authenticate('local-login', {failureRedirect: '/login',
                                                                        failureFlash: true,
                                                                        successRedirect: '/dashboard'}))

authController.login = function () {
  console.log('hi')
}

module.exports = authController
