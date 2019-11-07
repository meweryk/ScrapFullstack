const mongoose = require('mongoose')
const Schema = mongoose.Schema

const materialSchema = new Schema({
    vid: {
        type: String,
        required: true
    },
    ni: {
        type: Number
    },
    cr: {
        type: Number
    },
    mo: {
        type: Number
    },
    cu: {
        type: Number
    },
    mn: {
        type: Number
    },
    w: {
        type: Number
    },
    v: {
        type: Number
    },
    co: {
        type: Number
    },
    si: {
        type: String
    },
    ti: {
        type: Number
    },
    al: {
        type: String
    },
    nb: {
        type: String
    },
    fe: {
        type: Number
    },
    s: {
        type: Number
    },
    p: {
        type: Number
    },
    c: {
        type: Number
    },
    classSteel: {
        type: String
    },
    groupSteel: {
        type: String
    },
    markSteel: {
        type: String
    }

})

module.exports = mongoose.model('materials', materialSchema)