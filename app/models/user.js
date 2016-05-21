'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  languages: {HTML: String, CSS: String, NodeJs: String, Ruby: String}
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.checkLanguage = function (languages, cb) {
    for (let i = 0; i < languages.length; i++) {
      console.log(this.languages.hasOwnProperty(languages[i].language))
      if(this.languages.hasOwnProperty(languages[i].language)) {
        this.languages[languages[i].language] = 1
      }
    }

  this.save(function (err, user) {
    if (err) throw err
    cb(user)
  })
}

module.exports = mongoose.model('User', UserSchema)
