const passport = require('passport')
const User = require('../../app/models/user')
const LocalStrategy = require('passport-local').Strategy
// const GitHubStrategy = require('passport-github').Strategy

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, false, req.flash('errorMessage', 'This email is already used!'))
      } else {
        var newUser = new User()
        newUser.firstName = req.body.firstName
        newUser.lastName = req.body.lastName
        newUser.email = email
        newUser.password = User.encrypt(password)
        newUser.role = 'admin'
        newUser.languages = {}

        newUser.save(function (err, user) {
          if (err) return done(err)
          return done(null, user)
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({'email': email}, function (err, user) {
      console.log(email)
      if (err) return done(err)
      if (!user) return done(null, false, req.flash('errorMessage', 'Incorrect email'))
      if (!user.validPassword(password)) return done(null, false, req.flash('errorMessage', 'Incorrect Password'))
      return done(null, user)
    })
  }))
}
