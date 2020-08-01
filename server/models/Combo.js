const mongoose = require('mongoose')

const comboSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      productName: String,
      count: Number
    }
  ],
  price: Number,
  image: {
    type: String,
    default: 'combo-image-default.png'
  }
})

module.exports = mongoose.model('combos', comboSchema)