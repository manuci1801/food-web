const User = require('../models/User')
const Balance = require('../models/Balance')

const depositBalance = async (req, res) => {
  try {
    const { cardId, amount } = req.body
    if (cardId && amount) {
      let balance = await Balance.findOne({ userId: req.user.id })
      const balanceUpdated = await Balance.findOneAndUpdate({ userId: req.user.id }, { balance: balance.balance + parseInt(amount) })

      res.json({ success: true })
    } else {

    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  depositBalance
}