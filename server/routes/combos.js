const router = require('express').Router()
const passport = require('passport')

const { comboController } = require('../controllers')
const { isAdmin } = require('../middlewares')

const { uploadFile } = require('../utils')

router
  .route('/')
  .get(comboController.getCombos)
  .post(passport.authenticate('jwt', { session: false }), isAdmin, uploadFile.single('image'), comboController.postCombo)

router
  .route('/:id')
  .delete(passport.authenticate('jwt', { session: false }), isAdmin, comboController.deleteComboById)


module.exports = router