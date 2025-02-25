const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const sendRegistrationEmail = require('../meiler'); 
require('dotenv').config();

router.post('/registration', async (req, res) => {
  try {
    const { username, email, password, city, age, gender, phone } = req.body;
    
    const userCheck = await User.findOne({
      where: { email },
    })

    if (userCheck) {
      return res.status(400).json({ text: 'User already exists' }); 
    }


    const hashPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      city,
      age,
      gender,
      phone,
    });

  
    await sendRegistrationEmail(email, username);

   
    res.status(201).json({ text: 'OK', data: user });

  } catch (error) {
    console.log('Регистрация ошибка:', error)
    res.status(500).json({ text: 'Internal Server Error' })
  }
})

module.exports = router
