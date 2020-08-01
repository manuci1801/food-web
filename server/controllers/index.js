const authController = require('./auth')
const userController = require('./users')
const categoryController = require('./categories')
const productController = require('./products')
const comboController = require('./combos')
const transactionController = require('./transactions')
const balanceController = require('./balances')
const cardController = require('./cards')

module.exports = {
  authController,
  userController,
  categoryController,
  productController,
  comboController,
  transactionController,
  balanceController,
  cardController
}