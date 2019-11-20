const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    shopHost: {
        type: String,
        required: true
    },
    shopSend: {
        type: String,
        required: true
    },
    train: {
        type: String,
        required: true
    },
    waybill: {
        type: String,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            fraction: {
                type: String
            },
            quantity: {
                type: Number
            },
            rank: {
                type: String
            },
            trash: {
                type: Number
            },
            trashStap: {
                type: String
            },
            quantityNoTrash: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('deliveries', deliverySchema)