const router = require('express').Router()
const { User } = require('../db/models')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const userDB = await User.findOne({ where: { email } })
    if (userDB !== null) {
      const checkPassword = await bcrypt.compare(password, userDB.password)
      if (userDB && checkPassword) {
        req.session.loginedUser = {
          username: userDB.username,
          id: userDB.id,
          email: userDB.email,
          city: userDB.city,
          photoUrl: userDB.photoUrl,
          age: userDB.age,  
      gender: userDB.gender,
      phone: userDB.phone,
        }

        res.status(200).json({ text: 'OK', data: req.session.loginedUser })
      } else {
        res.status(403).json({ message: 'Неправильные логин(email) и/или пароль' })
        console.log('Данные пользователя из БД:', userDB);
        console.log('Сравнение паролей:', checkPassword);
      }
    } else {
      res.status(403).json({ message: 'Пользователя с данным емайлом не существует' })
    }
  } catch (error) {
    console.log('Ошибка при получении пользователя из БД: ', error)
    res.status(500).send('Ошибка сервера!')
  }
})

module.exports = router
