const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { authValidation } = require('../validation')

const User = require('../models/User')
const Balance = require('../models/Balance')

const register = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.register(req.body)
    if (!isValid)
      return res.status(400).json({ errors: errors })
    else {
      const { name, email, password, password2, phone, address } = req.body
      const userByEmail = await User.findOne({ email })

      if (!userByEmail) {
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
          name,
          email,
          password: hashPassword,
          phone,
          address
        })
        await newUser.save()

        let initBalance = new Balance({
          userId: newUser._id,
          balance: 10 // remove it if not demo
        })
        await initBalance.save()

        res.json({ success: true })
      } else {
        return res.status(400).json({ errors: ['Email is exists'] })
      }
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

const login = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.login(req.body)
    if (!isValid)
      return res.status(400).json({ errors: errors })
    else {
      const { email, password } = req.body
      let balance = 0
      const userByEmail = await User.findOne({ email })

      if (userByEmail) {
        if (userByEmail.role == 'user') {
          balance = (await Balance.findOne({ userId: userByEmail._id })).balance
        }

        const matchPassword = await bcryptjs.compare(password, userByEmail.password)
        if (matchPassword) {
          const payload = {
            id: userByEmail._id,
            name: userByEmail.name,
            email: userByEmail.email,
            phone: userByEmail.phone,
            address: userByEmail.address,
            role: userByEmail.role,
            balance: balance
          }
          const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '6h' })

          res.json({ success: true, token: `Bearer ${token}` })
        } else {
          return res.status(400).json({ errors: ['Password incorrect'] })
        }
      } else {
        return res.status(400).json({ errors: ['Email is not exists'] })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

const refreshToken = async (req, res) => {
  try {
    let balance = 0
    if (req.user.role == 'user') {
      balance = (await Balance.findOne({ userId: req.user.id })).balance
    }
    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role,
      balance: balance
    }
    const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '6h' })

    res.json({ success: true, token: `Bearer ${token}` })
  } catch (err) {
    return res.status(500).json(err)
  }
}

module.exports = {
  login,
  register,
  refreshToken
}