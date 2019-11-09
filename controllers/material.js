const Material = require('../models/Material')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const materials = await Material.find()
        res.status(200).json(materials)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const material = await Material.findById(req.params.id)
        res.status(200).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Material.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'Материал удалён.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const material = new Material({
        vid: req.body.vid,
        ni: req.body.ni,
        cr: req.body.cr,
        mo: req.body.mo,
        cu: req.body.cu,
        mn: req.body.mn,
        w: req.body.w,
        v: req.body.v,
        co: req.body.co,
        si: req.body.si,
        ti: req.body.ti,
        al: req.body.al,
        fe: req.body.fe,
        s: req.body.s,
        p: req.body.f,
        c: req.body.c,
        classSteel: req.body.classSteel,
        groupSteel: req.body.groupSteel,
        markSteel: req.body.markSteel
    })
    try {
        await category.save()
        res.status(201).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        vid: req.body.vid
    }

    try {
        const material = await Material.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })
        res.status(200).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}