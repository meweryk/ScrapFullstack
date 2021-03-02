const Coeff = require('../models/Coeff')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const coeff = await Coeff.find().sort({ vid: 1 })
        const arrVid = await Coeff.distinct('vid')
        const arrMaterial = await Coeff.distinct(('material'))
        const arrMethod = await Coeff.distinct((('method')))
        const coeffList = { coeff, arrVid, arrMaterial, arrMethod }
        res.status(200).json(coeffList)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const coeff = await new Coeff({
            vid: req.body.vid,
            name: req.body.name,
            material: req.body.material,
            method: req.body.method,
            coefficient: req.body.coefficient,
            user: req.user.id
        }).save()
        res.status(201).json(material)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const upcoeff = await Coeff.findOne({ _id: req.params.id })
    if ((upcoeff.user == req.user.id) || (req.user.id === "5d83890013edd119b4d510b0")) {
        try {
            const coeff = await Coeff.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            res.status(200).json(coeff)
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'Нет прав на внесение изменений.'
        })
    }
}

module.exports.remove = async function (req, res) {
    const upcoeff = await Coeff.findOne({ _id: req.params.id })
    if ((upcoeff.user == req.user.id) || (req.user.id === "5d83890013edd119b4d510b0")) {
        try {
            await Coeff.remove({
                _id: req.params.id
            })
            res.status(200).json({
                message: 'Коэффициент удалён.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'Нет прав на удаление.'
        })
    }
}

module.exports.getById = async function (req, res) {
    try {
        const coeff = await Coeff.findById(req.params.id)
        res.status(200).json(coeff)
    } catch (e) {
        errorHandler(res, e)
    }
}


