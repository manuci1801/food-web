const Product = require('../models/Product')
const Category = require('../models/Category')

const { removeFile } = require('../utils')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category')

    res.json({ success: true, data: products })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const postProduct = async (req, res) => {
  try {
    if (req.file) {
      let { name, category, price } = req.body

      const newProduct = new Product({
        name,
        category,
        price,
        image: req.file.filename
      })
      let category1 = await Category.findById(category)
      await newProduct.save()
      newProduct.category = category1

      res.json({ success: true, data: newProduct })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

const deleteProductById = async (req, res) => {
  try {
    let { id } = req.params

    const product = await Product.findByIdAndDelete(id)
    await removeFile(product.image)

    res.json({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

module.exports = {
  getProducts,
  postProduct,
  deleteProductById
}