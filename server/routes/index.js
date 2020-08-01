const authRoute = require('./auth')
const userRoute = require('./users')
const categoryRoute = require('./categories')
const productRoute = require('./products')
const comboRoute = require('./combos')
const transactionRoute = require('./transactions')
const balanceRoute = require('./balances')
const cardRoute = require('./cards')

module.exports = app => {
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/categories', categoryRoute)
  app.use('/api/v1/products', productRoute)
  app.use('/api/v1/combos', comboRoute)
  app.use('/api/v1/transactions', transactionRoute)
  app.use('/api/v1/balances', balanceRoute)
  app.use('/api/v1/cards', cardRoute)

  return app
}