const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', UserSchema)
