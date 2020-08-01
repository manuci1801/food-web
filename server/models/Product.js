const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: 'product-image-default.png'
  },
  // type: {
  //   type: String,
  //   enum: ['food', 'addon', 'bonus', 'recommend'],
  //   default: 'food'
  // }
})

module.exports = mongoose.model('products', productSchema)