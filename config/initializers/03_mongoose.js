var mongoose = require('mongoose')

module.exports = function () {
  switch (this.env) {
    case 'development':
      mongoose.connect('mongodb://localhost:27017/studentDashboard')
      break
    case 'production':
      mongoose.connect(process.env.MONGOLAB_URI)
      break
  }
}
