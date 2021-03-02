const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coeffSchema = new Schema({
    vid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },//имя материала
    material: {
        type: String,
        required: true
    },//shiht fert - шихта ферросплав
    method: {
        type: String,
        required: true,
    },//завалка, рафинировка, ГКР ...
    coefficient: {
        type: Number,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('coefficient', coeffSchema)