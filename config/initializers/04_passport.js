const passport = require('passport')
const User = require('../../app/models/user')
const LocalStrategy = require('passport-local').Strategy
// const GitHubStrategy = require('passport-github').Strategy

module.exports = function () {
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
        newUser.email = email
        newUser.local.password = User.encrypt(password)

        newUser.save(function (err, user) {
          if (err) return done(err)
          return done(null, user)
        })
      }
    })
  }))
}
