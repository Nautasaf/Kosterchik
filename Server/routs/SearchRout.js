const express = require('express');
const { Event } = require('../db/models');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const searchEvents = async (filters) => {
  const { city, date, title } = filters;
  const where = {};

  // Поиск по городу
  if (city && city.trim() !== '') {
    where.city = { [Sequelize.Op.iLike]: `%${city.trim()}%` };
  }

  // Поиск по дате (игнорируем время)
  if (date && date.trim() !== '') {
    const trimmedDate = date.trim();
    let formattedDate;

    // Попытка распарсить дату в трех форматах
    if (moment(trimmedDate, 'YYYY', true).isValid()) {
      // Если только год
      formattedDate = moment(trimmedDate, 'YYYY', true);
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('year').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('year').toDate(),
      };
    } else if (moment(trimmedDate, 'MM-YYYY', true).isValid()) {
      // Если месяц и год
      formattedDate = moment(trimmedDate, 'MM-YYYY', true);
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('month').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('month').toDate(),
      };
    } else if (moment(trimmedDate, 'DD-MM-YYYY', true).isValid()) {
      // Если день, месяц и год
      formattedDate = moment(trimmedDate, 'DD-MM-YYYY', true);
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('day').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('day').toDate(),
      };
    } else {
      throw new Error('Некорректная дата');
    }
  }

  // Поиск по названию
  if (title && title.trim() !== '') {
    where.title = { [Sequelize.Op.iLike]: `%${title.trim()}%` };
  }

  try {
    const events = await Event.findAll({ where });
    return events;
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