const moment = require('moment-timezone')
const Fuse = require('../models/Fuse')
const errorHandler = require('../utils/errorHandler')

const zone = "Europe/Zaporozhye"

//localhost:5000/api/fuse?offset=2&limit=5
module.exports.getAll = async function (req, res) {
  try {
    const fuses = await Fuse.find({
      shop: req.user.shop
    })
    res.status(200).json(fuses)
  } catch (e) {
    errorHandler(res, e)
  }
  /*const query = {}
 
  if (req.user.shop) {
    query.$or = [
      { shopBuyer: req.user.shop },
      {
        list: {
          $elemMatch: {
            shopSeller: req.user.shop
          }
        }
      }
    ]
  } else {
    query.userBuyer = req.user.id
  }
 
  //дата старта
  if (req.query.start) {
    query.date = {
      //больше или равно
      $gte: req.query.start
    }
  }
 
  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }
 
  if (req.query.order) {
    query.order = +req.query.order
  }
 
  try {
    const orders = await Order
      .find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit)
    res.status(200).json(orders)
 
  } catch (e) {
    errorHandler(res, e)
  }*/
}

module.exports.getById = async function (req, res) {
  try {
    const fuse = await Fuse.findById(req.params.id)
    res.status(200).json(fuse)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const newfuse = await Fuse.findOne({ fuse: req.body.fuse })

  if (newfuse) {
    // плавка существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Плавка уже существует. Войдите и добавьте свои позиции.'
    })
  } else {
    //создаём новую плавку
    const fuse = new Fuse({
      fuse: req.body.fuse,
      fuseCard: req.body.fuseCard,
      alloy: req.body.alloy,
      user: req.user.id,
      shop: req.user.shop,
      nicname: req.user.nicname,
    })
    try {
      await fuse.save()
      res.status(201).json(fuse)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports.update = async function (req, res) {
  const upfuse = await Fuse.findOne({ _id: req.params.id })
  if (upfuse.shop == req.user.shop) {
    const updated = {
      fuse: req.body.fuse,
      fuseCard: req.body.fuseCard,
      alloy: req.body.alloy,
      user: req.user.id,
      shop: req.user.shop,
      nicname: req.user.nicname,
      update: moment().tz(zone)
    }

    try {
      const fuse = await Fuse.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      )
      res.status(200).json(fuse)
    } catch (e) {
      errorHandler(res, e)
    }
  } else {
    res.status(409).json({
      message: 'У Вас нет прав на редактирование этой плавки.'
    })
  }

}

module.exports.remove = async function (req, res) {
  //удаление файлов, если они есть
  //const thisShop = await Position.find({ category: req.params.id, shop: req.user.shop })

  const fuse = await Fuse.findOne({ _id: req.params.id })

  //проверяем пользователя на принадлежность цеху
  if (fuse.shop == req.user.shop) {
    //если пользователь относится к цеху, который создал запись о плавке
    try {
      await fuse.remove({
        _id: req.params.id
      })
      /*await Position.remove({
        category: req.params.id,
        shop: req.user.shop
      })*/

      res.status(200).json({
        message: 'Плавка удалена'
      })
    } catch (e) {
      errorHandler(res, e)
    }

  } else {
    res.status(409).json({
      message: 'У Вас нет прав на удаление или внесение изменений.'
    })
  }
}