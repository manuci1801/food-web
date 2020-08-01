const mongoose = require('mongoose')

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log('MongoDB Connected')
  } catch (err) {
    console.log('Cannot connect to MongoDB')
  }
}