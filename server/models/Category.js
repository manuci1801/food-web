const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['product', 'combo'],
    required: true
  }
})

module.exports = mongoose.model('categories', categorySchema)