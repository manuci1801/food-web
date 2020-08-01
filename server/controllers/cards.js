const Card = require('../models/Card')

const getCardsByUser = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id })

    res.json({ success: true, data: cards })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const newCard = async (req, res) => {
  try {
    const { name, cardNumber, date, cvc } = req.body

    if (name && cardNumber && date && cvc) {
      const newCard = new Card({
        userId: req.user.id,
        name,
        cardNumber,
        date,
        cvc
      })
      await newCard.save()
      res.json({ success: true, data: newCard })
    } else {
      return res.status(400).json({
        success: false,
        errors: ['Please fill all fields']
      })
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  getCardsByUser,
  newCard
}