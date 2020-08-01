const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: String,
  cardNumber: String,
  date: String,
  cvc: String
})

module.exports = mongoose.model('cards', cardSchema)