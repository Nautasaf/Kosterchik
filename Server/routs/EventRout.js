const express = require('express');
const {Event} = require('../db/models')
const router = express.Router();
const {User} = require('../db/models')

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении событий' });
  }
});


router.post('/user-event', async (req, res) => {
  
  const { userId } = req.body;
  try {
    const events = await Event.findAll({
      where: { userId }, 
    });

    if (events.length === 0) {
      return res.status(404).json({ error: 'События не найдены' });
    }

    return res.json(events );
  } catch (error) {
    console.error("Ошибка при получении событий пользователя:", error);
    return res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

module.exports = router;