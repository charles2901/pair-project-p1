const routes = require('express').Router()
const HomeController = require('../controller/homeController')
const UserRoutes = require('../routes/userRoutes')
const StoreRoute = require('../routes/storeRoutes')
const CartRoute = require('../routes/cartRoutes')

routes.get('/', HomeController.getHome)
routes.use('/user', UserRoutes)
routes.use('/store', StoreRoute)
routes.use('/cart', CartRoute)

module.exports = routes