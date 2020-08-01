const router = require('express').Router()
const passport = require('passport')

const { userController } = require('../controllers')
const { isAdmin } = require('../middlewares/index')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), isAdmin, userController.getUsers)

module.exports = router