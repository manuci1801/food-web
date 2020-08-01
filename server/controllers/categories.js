const Category = require('../models/Category')
const Product = require('../models/Product')

const getCategories = async (req, res) => {
  try {
    let categories = await Category.find()

    res.json({ success: true, data: categories })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const postCategory = async (req, res) => {
  try {
    const { name, type } = req.body
    if (name) {
      let newCategory = new Category({
        name,
        type
      })

      await newCategory.save()
      res.json({ success: true, data: newCategory })
    } else
      res.status(400).json({ success: false, errors: ['Please add name of category'] })

  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteCategoryById = async (req, res) => {
  try {
    let { id } = req.params
    const products = await Product.findOne({ category: id })
    if (products) {
      return res.status(400).json({ success: false, errors: ['Exists products in this category'] })
    }
    await Category.findByIdAndRemove(id)

    res.json({ success: true })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getProductsByCategoryId = async (req, res) => {
  try {
    const { id } = req.params

    const products = await Product.find({ category: id })

    res.json({ success: true, data: products })
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCategories,
  postCategory,
  getProductsByCategoryId,
  deleteCategoryById
}