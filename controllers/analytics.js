const moment = require('moment-timezone')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

const zone = "Europe/Zaporozhye"

module.exports.overview = async function (req, res) {
    try {
        const allOrders = await Order.find({ $or: [{ shopBuyer: req.user.shop }, { list: { $elemMatch: { shopSeller: req.user.shop } } }] }).sort({ date: 1 })
        const shop = req.user.shop
        const ordersMap = getOrdersMap(allOrders, shop)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []
        //Входящие заказы
        const yesterdayOrdersIn = ordersMap[0][moment().add(-1, 'd').format('DD.MM.YYYY')] || []
        //Исходящие заказы
        const yesterdayOrdersOut = ordersMap[1][moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        //Количество заказов вчера
        const yesterdayOrdersInNumber = +yesterdayOrdersIn.length
        const yesterdayOrdersOutNumber = +yesterdayOrdersOut.length
        const yesterdayOrdersNumber = yesterdayOrdersOutNumber + yesterdayOrdersInNumber

        //Количество заказов всего
        const totalOrdersInNumber = +ordersMap[2]
        const totalOrdersOutNumber = +ordersMap[3]
        const totalOrdersNumber = allOrders.length

        //Количество дней
        const daysNumber = Object.keys(ordersMap[0]).length

        //Заказов в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(1)
        const ordersInPerDay = (totalOrdersInNumber / daysNumber).toFixed(1)
        const ordersOutPerDay = (totalOrdersOutNumber / daysNumber).toFixed(1)

        //Процент для количества заказов = ((заказов вчера / заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
        const ordersInPercent = (((yesterdayOrdersInNumber / ordersInPerDay) - 1) * 100).toFixed(2)
        const ordersOutPercent = (((yesterdayOrdersOutNumber / ordersOutPerDay) - 1) * 100).toFixed(2)

        //Общая выручка
        const totalGain = calculatePrice(allOrders, '')
        const totalGainIn = calculatePrice(allOrders, shop)
        const totalGainOut = totalGain - totalGainIn

        //Выручка в день
        const gainPerDay = (totalGain / daysNumber).toFixed(2)
        const gainInPerDay = (totalGainIn / daysNumber).toFixed(2)
        const gainOutPerDay = (totalGainOut / daysNumber).toFixed(2)

        //Выручка за вчера
        const yesterdayGainIn = +(calculatePrice(yesterdayOrdersIn, shop)).toFixed(2)
        const yesterdayGainOut = +(calculatePrice(yesterdayOrdersOut, '')).toFixed(2)
        const yesterdayGain = +(yesterdayGainIn + yesterdayGainOut).toFixed(2)

        //Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
        const gainPercentIn = (((yesterdayGainIn / gainInPerDay) - 1) * 100).toFixed(2)
        const gainPercentOut = (((yesterdayGainOut / gainOutPerDay) - 1) * 100).toFixed(2)

        //Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        const compareGainIn = (yesterdayGainIn - gainInPerDay).toFixed(2)
        const compareGainOut = (yesterdayGainOut - gainOutPerDay).toFixed(2)
        //Сравнение количества заказов
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)
        const compareNumberIn = (yesterdayOrdersInNumber - ordersInPerDay).toFixed(2)
        const compareNumberOut = (yesterdayOrdersOutNumber - ordersOutPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                percentIn: Math.abs(+gainPercentIn),
                percentOut: Math.abs(+gainPercentOut),

                compare: Math.abs(+compareGain),
                compareIn: Math.abs(+compareGainIn),
                compareOut: Math.abs(+compareGainOut),

                yesterday: +yesterdayGain,
                yesterdayIn: +yesterdayGainIn,
                yesterdayOut: +yesterdayGainOut,

                isHigher: +gainPercent > 0,
                isHigherIn: +gainPercentIn > 0,
                isHigherOut: +gainPercentOut > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                percentIn: Math.abs(+ordersInPercent),
                percentOut: Math.abs(+ordersOutPercent),

                compare: Math.abs(+compareNumber),
                compareIn: Math.abs(+compareNumberIn),
                compareOut: Math.abs(+compareNumberOut),

                yesterday: +yesterdayOrdersNumber,
                yesterdayIn: +yesterdayOrdersInNumber,
                yesterdayOut: +yesterdayOrdersOutNumber,

                isHigher: +ordersPercent > 0,
                isHigherIn: +ordersInPercent > 0,
                isHigherOut: +ordersOutPercent > 0
            }
        })

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.analytics = async function (req, res) {
    try {
        const allOrders = await Order.find({ $or: [{ shopBuyer: req.user.shop }, { list: { $elemMatch: { shopSeller: req.user.shop } } }] }).sort({ date: 1 })
        const shop = req.user.shop
        const ordersMap = getOrdersMap(allOrders, shop)

        //Средний чек всех заказов
        const average = +(calculatePrice(allOrders, '') / Object.keys(ordersMap[0]).length).toFixed(2)
        const averageIn = +(calculatePrice(allOrders, shop) / Object.keys(ordersMap[0]).length).toFixed(2)
        const averageOut = +(average - averageIn).toFixed(2)

        const chart = Object.keys(ordersMap[0]).map(label => {
            //label = =05.05.2019
            const gain = calculatePrice(ordersMap[0][label]) + calculatePrice(ordersMap[1][label])
            const gainIn = calculatePrice(ordersMap[0][label])
            const gainOut = calculatePrice(ordersMap[1][label])
            const order = ordersMap[0][label].length + ordersMap[1][label].length
            const orderIn = ordersMap[0][label].length
            const orderOut = ordersMap[1][label].length

            return { label, order, orderIn, orderOut, gain, gainIn, gainOut }
        })

        res.status(200).json({ average, averageIn, averageOut, chart })

    } catch (e) {
        errorHandler(res, e)
    }
}

function getOrdersMap(orders = [], shop = '') {
    let out = 0 //исходящие ордера
    let i = 0 //входящие ордера
    const daysOrdersIn = {}
    const daysOrdersOut = {}
    orders.forEach(order => {
        const date = moment(order.date).utc().tz(zone).format('DD.MM.YYYY')

        if (date === moment().tz(zone).format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrdersIn[date] && !daysOrdersOut[date]) {
            daysOrdersIn[date] = []
            daysOrdersOut[date] = []
        }

        if (order.shopBuyer == shop) {
            daysOrdersIn[date].push(order);
            i++
        } else {
            daysOrdersOut[date].push(order)
            out++
        }

    })

    return [daysOrdersIn, daysOrdersOut, i, out]
}

function calculatePrice(orders = [], shop = '') {
    if (shop) {
        return orders.reduce((total, order) => {
            if (order.shopBuyer === shop) {
                const orderPrice = order.list.reduce((orderTotal, item) => {
                    return orderTotal += item.cost * item.quantity
                }, 0)
                total += orderPrice
            }
            return total
        }, 0)

    } else {
        return orders.reduce((total, order) => {
            if (order.shopBuyer != shop) {
                const orderPrice = order.list.reduce((orderTotal, item) => {
                    return orderTotal += item.cost * item.quantity
                }, 0)
                total += orderPrice
            }
            return total
        }, 0)
    }

}


