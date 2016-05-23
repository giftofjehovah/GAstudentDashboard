const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
  student: String,
  studentId: String,
  feedback: String
})

module.exports = mongoose.model('Feedback', FeedbackSchema)
