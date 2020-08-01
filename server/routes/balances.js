const router = require('express').Router()
const passport = require('passport')

const { balanceController } = require('../controllers')
const { isAdmin } = require('../middlewares')

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), balanceController.depositBalance)



module.exports = router
