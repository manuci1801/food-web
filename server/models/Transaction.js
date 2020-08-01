const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      count: Number
    }
  ],
  combos: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'combos'
      },
      count: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['in-process', 'success', 'cancelled'],
    default: 'in-process'
  },
  paymentMethod: {
    type: String,
    enum: ['ship-cod', 'balance'],
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

module.exports = mongoose.model('transactions', transactionSchema)