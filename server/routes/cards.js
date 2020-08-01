const router = require('express').Router()
const passport = require('passport')

const { cardController } = require('../controllers')
const { isAdmin } = require('../middlewares')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), cardController.getCardsByUser)
  .post(passport.authenticate('jwt', { session: false }), cardController.newCard)

module.exports = router