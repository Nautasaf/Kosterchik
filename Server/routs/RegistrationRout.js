const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../db/models')

router.post('/registration', async (req, res) => {
  try {
    const { username, email, password, city } = req.body

    const userCheck = await User.findOne({
      where: { email },
    })

    if (userCheck) res.status(400).json({ text: 'Пользователь существует' })

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      city: city,
    })
    res.status(201).json({ text: 'OK', data: user })
  } catch (error) {
    console.log('Регистрация ошибка:', error)
    res.status(500).json({ text: 'Internal Server Error' })
  }
})

module.exports = router
