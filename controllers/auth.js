const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, { expiresIn: 60 * 60 * 12 })
      const nicname = candidate.nicname
      const shop = candidate.shop
      const email = candidate.email
      const phone = candidate.phone
      const role = candidate.role
      const id = candidate._id

      res.status(200).json({
        token: `Bearer ${token}`,
        nicname: nicname,
        shop: shop,
        email: email,
        phone: phone,
        role: role,
        id: id
      })
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    })
  }
}

module.exports.register = async function (req, res) {
  // email password
  const candidate = await User.findOne({ email: req.body.email })
  const candiShop = await User.findOne({ shop: req.body.shop })

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      nicname: req.body.nicname,
      shop: req.body.shop,
      phone: req.body.phone,
      role: candiShop ? 'worker' : 'boss'
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.getById = async function (req, res) {
  try {
    const user = await User.findById(req.params.id, { email: true, phone: true })
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  const updated = {}
  //проверка email
  const anyuser = await User.find({ email: req.body.email, _id: { $ne: req.params.id } })
  if (anyuser.length > 0) {
    // Этот email уже занят, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    updated.email = req.body.email
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      updated.password = bcrypt.hashSync(password, salt)
    }

    updated.nicname = req.body.nicname
    updated.shop = req.body.shop
    updated.phone = req.body.phone
    updated.role = req.body.role

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      )
      const token = jwt.sign({
        email: req.body.email,
        userId: req.params.id
      }, keys.jwt, { expiresIn: 60 * 60 * 12 })
      const nicname = updated.nicname
      const shop = updated.shop
      const email = updated.email
      const phone = updated.phone
      const role = updated.role
      const id = req.params.id
      res.status(200).json({
        token: `Bearer ${token}`,
        nicname: nicname,
        shop: shop,
        email: email,
        phone: phone,
        role: role,
        id: id
      })
    } catch (e) {
      errorHandler(res, e)
    }
  }


}

module.exports.remove = async function (req, res) {
  try {
    await User.remove({
      _id: req.params.id
    })
    res.status(200).json({
      message: 'Пользователь удалён.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}
