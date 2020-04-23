const express = require('express')
const StoreController = require('../controller/StoreController')

const router = express.Router()


function checkSession(req, res, next) {
    if(req.session.userId) {
      next()
    } else {
      res.redirect(`/?msg=Silahkan Login terlebih dahulu&type=danger`)
    }
}

router.get('/',  StoreController.page)
router.post('/addToCart/:id', checkSession, StoreController.addToCartPost)

module.exports = router