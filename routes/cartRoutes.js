const express = require('express')
const CartController = require('../controller/CartController')

const router = express.Router()

function checkSession(req, res, next) {
    if(req.session.userId) {
      next()
    } else {
      res.redirect(`/?msg=Silahkan Login terlebih dahulu&type=danger`)
    }
}
router.get('/', checkSession, CartController.page)

router.get('/checkout', CartController.checkOut)
router.get('/delete/:id', CartController.delete)
module.exports = router