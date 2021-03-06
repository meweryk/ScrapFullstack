const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fuseSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    fuseDate: {
        type: Date,
        default: null
    },
    update: {
        type: Date,
        default: Date.now
    },
    fuse: {
        type: String,
        required: true
    },
    alloy: {
        type: String,
        required: true
    },
    fuseCard: {
        type: String,
        default: null
    },
    shop: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    nicname: {
        type: String
    },

    /*list: [
        {
            name: {
                type: String
            },
            exposition: {
                type: String
            },
            imageSrc: {
                type: String,
                default: ''
            },
            quantity: {
                type: Number
            },
            rank: {
                type: String
            },
            cost: {
                type: Number
            },
            shopSeller: {
                type: String
            },
            userSeller: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            phoneSeller: {
                type: String
            },
            emailSeller: {
                type: String
            }
        }
    ],*/

})

module.exports = mongoose.model('fuses', fuseSchema)