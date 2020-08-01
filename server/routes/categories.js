const router = require('express').Router()
const passport = require('passport')

const { categoryController } = require('../controllers')
const { isAdmin } = require('../middlewares')

router
  .route('/')
  .get(categoryController.getCategories)
  .post(passport.authenticate('jwt', { session: false }), isAdmin, categoryController.postCategory)

router
  .route('/:id')
  .get(categoryController.getProductsByCategoryId)
  .delete(passport.authenticate('jwt', { session: false }), isAdmin, categoryController.deleteCategoryById)

module.exports = router