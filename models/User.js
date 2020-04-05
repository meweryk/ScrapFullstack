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
  }
})

module.exports = mongoose.model('users', userSchema)