// В серверной части (например, Express.js)
const express = require('express');
const { User } = require('../db/models'); // Подключаем модель User

const router = express.Router();

// Маршрут для получения пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Ищем пользователя по первичному ключу (ID)
    
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    return res.json(user); // Отправляем найденного пользователя
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

module.exports = router;