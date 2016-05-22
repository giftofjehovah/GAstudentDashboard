const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
  student: String,
  feedback: String
})

module.exports = mongoose.model('Feedback', FeedbackSchema)
