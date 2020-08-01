const router = require('express').Router()
const passport = require('passport')

const { transactionController } = require('../controllers')
const { isAdmin } = require('../middlewares/index')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), transactionController.getTransactionsByUser)
  .post(passport.authenticate('jwt', { session: false }), transactionController.newTransaction)

router
  .route('/admin')
  .get(passport.authenticate('jwt', { session: false }), isAdmin, transactionController.getAllTransactionsByAdmin)

router
  .route('/admin/confirm')
  .post(passport.authenticate('jwt', { session: false }), isAdmin, transactionController.confirmTransaction)

router
  .route('/admin/cancel')
  .post(passport.authenticate('jwt', { session: false }), isAdmin, transactionController.cancelTransaction)

module.exports = router