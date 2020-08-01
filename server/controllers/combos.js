const Combo = require('../models/Combo')

const { removeFile } = require('../utils')

const getCombos = async (req, res) => {
  try {
    const combos = await Combo.find().populate('category')

    res.json({ success: true, data: combos })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const postCombo = async (req, res) => {
  try {
    let { name, category, products, price } = req.body

    console.log(JSON.parse(products))
    const newCombo = new Combo({
      name,
      category,
      products: JSON.parse(req.body.products),
      price,
      image: req.file.filename
    })

    await newCombo.save()

    res.json({ success: true, data: newCombo })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

const deleteComboById = async (req, res) => {
  try {
    let { id } = req.params

    const combo = await Combo.findByIdAndDelete(id)
    await removeFile(combo.image)

    res.json({ success: true })
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCombos,
  postCombo,
  deleteComboById
}