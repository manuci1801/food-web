const mongoose = require('mongoose')

const balanceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  balance: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('balance', balanceSchema)