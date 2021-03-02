const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nicname: {
    type: String,
    required: true
  },
  shop: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    default: 'worker' // may be ['admin', 'boss', 'master', 'worker']
  }
})

module.exports = mongoose.model('users', userSchema)