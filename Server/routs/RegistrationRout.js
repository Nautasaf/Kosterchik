const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.post('/registration', async (req, res) => {
  try {
    const { username, email, password, city } = req.body;

    const userCheck = await User.findOne({
      where: { email },
    });

    if (userCheck === null) {

      const hashPassword = await bcrypt.hash(password, 10);

     
      const user = await User.create({
        username: username,
        email: email,
        password: hashPassword,
        city: city,
      });

      if (user) {
        const selectionUser = await User.findOne({
          where: { email },
        });

      
        if (selectionUser) {
          const isPasswordValid = await bcrypt.compare(
            password,
            selectionUser.password
          );

          if (isPasswordValid) {
            res.status(201).json({ text: 'OK', data: selectionUser });
          } else {

            res.status(400).json({ text: 'Invalid password' });
          }
        }
      }
    } else {
    
      res.status(200).json({ text: 'User already exists' });
    }
  } catch (error) {
    console.log('Регистрация ошибка:', error);
    res.status(500).json({ text: 'Internal Server Error' });
  }
});

module.exports = router;