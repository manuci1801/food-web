const router = require('express').Router()
const passport = require('passport')

const { productController } = require('../controllers')
const { isAdmin } = require('../middlewares')

const { uploadFile } = require('../utils')

router
  .route('/')
  .get(productController.getProducts)
  .post(passport.authenticate('jwt', { session: false }), isAdmin, uploadFile.single('image'), productController.postProduct)

router
  .route('/:id')
  .delete(passport.authenticate('jwt', { session: false }), isAdmin, productController.deleteProductById)


module.exports = router