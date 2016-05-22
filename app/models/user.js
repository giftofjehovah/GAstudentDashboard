'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  languages: Schema.Types.Mixed,
  topicNotGrasp: Schema.Types.Mixed
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.addTopicNotGrasp = function (topic, cb) {
  var tempTopic = {}
  if (this.topicNotGrasp) {
    if (!this.topicNotGrasp.hasOwnProperty(topic.topicLanguage)) {
      this.topicNotGrasp[topic.topicLanguage] = []
    }
  } else {
    var tempTopicNotGrasp = {}
    tempTopicNotGrasp[topic.topicLanguage] = []
    this.topicNotGrasp = tempTopicNotGrasp
  }
  tempTopic[topic.topicText] = topic.grasp
  this.topicNotGrasp[topic.topicLanguage].push(tempTopic)
  this.markModified('topicNotGrasp')
  this.save(function (err, topic) {
    if (err) throw err
    cb(topic)
  })
}

UserSchema.methods.checkLanguage = function (languages, cb) {
  if (this.languages) {
    for (let i = 0; i < languages.length; i++) {
      if (!this.languages.hasOwnProperty(languages[i].language)) {
        this.languages[languages[i].language] = '1'
      }
    }
  } else {
    var tempLanguage = {}
    for (let i = 0; i < languages.length; i++) {
      tempLanguage[languages[i].language] = '1'
    }
    this.languages = tempLanguage
  }

  this.markModified('languages')
  this.save(function (err, user) {
    if (err) throw err
    cb(user)
  })
}

module.exports = mongoose.model('User', UserSchema)
