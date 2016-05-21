const mongoose = require('mongoose')

const LanguageSchema = mongoose.Schema({
  language: String
})

module.exports = mongoose.model('Language', LanguageSchema)
