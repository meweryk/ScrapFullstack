const Position = require('../models/Position')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryIdAllShop = async function (req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId
    })
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getByCategoryId = async function (req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      //shop: req.user.shop
    })
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      stock: req.body.stock,
      rank: req.body.rank,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id,
      shop: req.user.shop,
      nicname: req.user.nicname
    }).save()
    console.log(position.shop, position.nicname)
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Position.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Позиция была удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
        user: req.user.id,
        nicname: req.user.nicname
      },
      { new: true }
    )
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}