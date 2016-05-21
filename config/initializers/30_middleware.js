var express = require('express')
var poweredBy = require('connect-powered-by')
var passport = require('passport')
var flash = require('connect-flash')

module.exports = function () {
  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  if (this.env === 'development') {
    this.use(express.logger())
  }

  this.use(poweredBy('Locomotive'))
  this.use(express.favicon())
  this.use(express.static(__dirname + '/../../public'))
  this.use(express.bodyParser())
  this.use(express.methodOverride())
  this.use(flash())
  this.use(express.session({secret: 'supercat'}))
  this.use(passport.initialize())
  this.use(passport.session())
  this.use(this.router)
  this.use(express.errorHandler())
}
