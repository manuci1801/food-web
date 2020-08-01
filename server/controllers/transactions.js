const Transaction = require('../models/Transaction')
const Balance = require('../models/Balance')

const newTransaction = async (req, res) => {
  try {
    let { id } = req.user
    let { cart, total, paymentMethod } = req.body

    let products = cart.reduce((acc, e) => {
      if (e.type == 'product') {
        delete e.type
        return [...acc, e]
      } else
        return acc
    }, [])
    let combos = cart.reduce((acc, e) => {
      if (e.type == 'combo') {
        delete e.type
        return [...acc, e]
      } else
        return acc
    }, [])

    if (paymentMethod === 'balance') {
      let balance = (await Balance.findOne({ userId: id })).balance
      if (balance < total) {
        return res.status(400).json({ success: false, errors: ['Balance not enough'] })
      } else {
        await Balance.findOneAndUpdate({ userId: id }, { balance: balance - total }, { new: true })
      }
    }

    const newTransaction = new Transaction({
      userId: id,
      products: products ? products : [],
      combos: combos ? combos : [],
      total,
      paymentMethod
    })
    await newTransaction.save()

    res.json({ success: true, data: newTransaction })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })

    res.json({ success: true, data: transactions })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const getAllTransactionsByAdmin = async (req, res) => {
  try {
    const transactions = await Transaction.find({})

    res.json({ success: true, data: transactions })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const confirmTransaction = async (req, res) => {
  try {
    let { id } = req.body

    await Transaction.findByIdAndUpdate(id, { status: 'success' }, { new: true })

    res.json({ success: true })
  } catch (err) {
    return res.status(500).json(err)
  }
}

const cancelTransaction = async (req, res) => {
  try {
    const { id } = req.body

    const transaction = await Transaction.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true })

    // update balance
    const balance = await Balance.findOne({ userId: transaction.userId })
    await Balance.findOneAndUpdate({ userId: transaction.userId }, { balance: balance.balance + transaction.total })

    res.json({ success: true })
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  newTransaction,
  getTransactionsByUser,
  getAllTransactionsByAdmin,
  confirmTransaction,
  cancelTransaction
}