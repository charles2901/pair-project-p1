const routes = require('express').Router()
const UserController = require('../controller/userController')




routes.get('/register', UserController.register)
routes.post('/register', UserController.postRegist)
routes.get('/login', UserController.login)
routes.post('/login', UserController.postLogin)
routes.get('/logOut', UserController.logOut)


module.exports = routes