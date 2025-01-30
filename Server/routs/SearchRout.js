const express = require('express');
const { Event } = require('../db/models');
const Sequelize = require('sequelize'); 
const router = express.Router();

const searchEvents = async (filters) => {
    const { city, date, title } = filters;

    const where = {};

    if (city && city.trim() !== '') where.city = { [Sequelize.Op.iLike]: `%${city.trim()}%` };
    if (date && date.trim() !== '') where.date = date.trim();
    if (title && title.trim() !== '') where.title = { [Sequelize.Op.iLike]: `%${title.trim()}%` };

   

    try {
      return await Event.findAll({ where });
    } catch (error) {
      console.log('Ошибка при поиске событий:', error);
      throw error;
    }
};

router.post('/', async (req, res) => {
  try {
    const filters = req.body;
    const events = await searchEvents(filters);
    console.log('Найденные события:', events); 
    res.json(events);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

module.exports = router;