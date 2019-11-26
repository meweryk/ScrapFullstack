const Material = require('../models/Material')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {}

    if (req.query.vid) {
        query.vid = req.query.vid
    }

    if (req.query.classSteel) {
        query.classSteel = req.query.classSteel
    }

    if (req.query.groupSteel) {
        query.groupSteel = req.query.groupSteel
    }

    try {
        const materials = await Material.find(query).sort({ vid: 1 })
        const arrClassSteel = await Material.distinct('classSteel')
        const arrGroupSteel = await Material.distinct(('groupSteel'))
        const materialList = { materials, arrClassSteel, arrGroupSteel }
        res.status(200).json(materialList)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const material = await new Material({
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
            p: req.body.p,
            s: req.body.s,
            c: req.body.c,
            classSteel: req.body.classSteel,
            groupSteel: req.body.groupSteel,
            markSteel: req.body.markSteel,
            user: req.user.id
        }).save()
        res.status(201).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const material = await Material.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
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

module.exports.getById = async function (req, res) {
    try {
        const material = await Material.findById(req.params.id)
        res.status(200).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}


