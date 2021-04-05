const express = require('express')
const passport = require('passport')
const controller = require('../controllers/auth')
const router = express.Router()

// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.register)

router.patch('/update/:id', passport.authenticate('jwt', {
    session: false
}), controller.update)

router.patch('/change', passport.authenticate('jwt', {
    session: false
}), controller.change)

router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), controller.remove)

router.get('/:id', passport.authenticate('jwt', {
    session: false
}), controller.getById)

router.get('/', passport.authenticate('jwt', {
    session: false
}), controller.getByShop)

module.exports = router