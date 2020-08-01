const router = require('express').Router()
const passport = require('passport')

const { authController } = require('../controllers')

router
  .route('/register')
  .post(authController.register)

router
  .route('/login')
  .post(authController.login)

router
  .route('/refresh-token')
  .get(passport.authenticate('jwt', { session: false }), authController.refreshToken)

module.exports = router
