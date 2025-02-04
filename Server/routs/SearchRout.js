const express = require('express');
const { Event } = require('../db/models');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const searchEvents = async (filters) => {
  const { city, date, title } = filters;
  const where = {};

  if (city && city.trim() !== '') {
    where.city = { [Sequelize.Op.iLike]: `%${city.trim()}%` };
  }

  if (date && date.trim() !== '') {
    let trimmedDate = date.trim();

    // Дополняем месяц нулем, если он состоит из одной цифры
    if (trimmedDate.split('-')[1].length === 1) {
      trimmedDate = trimmedDate.replace(/-(\d)$/, '-0$1');
    }

    let formattedDate;

    // Логика для поиска по дате (например, по году, месяцу или дням)
    if (moment(trimmedDate, 'DD-MM', true).isValid()) {
      // Если введена дата в формате "DD-MM", то добавляем текущий год
      formattedDate = moment(trimmedDate, 'DD-MM', true).year(new Date().getFullYear());
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('day').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('day').toDate(),
      };
    } else if (moment(trimmedDate, 'YYYY-MM-DD', true).isValid()) {
      // Если введена дата в формате "YYYY-MM-DD"
      formattedDate = moment(trimmedDate, 'YYYY-MM-DD', true);
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('day').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('day').toDate(),
      };
    } else if (moment(trimmedDate, 'MM-YYYY', true).isValid()) {
      // Если введена дата в формате "MM-YYYY", ищем по месяцу
      formattedDate = moment(trimmedDate, 'MM-YYYY', true);
      where.date = {
        [Sequelize.Op.gte]: formattedDate.startOf('month').toDate(),
        [Sequelize.Op.lte]: formattedDate.endOf('month').toDate(),
      };
    } else {
      console.log('Некорректная дата');
    }
  }

  if (title && title.trim() !== '') {
    where.title = { [Sequelize.Op.iLike]: `%${title.trim()}%` };
  }

  try {
    const events = await Event.findAll({ where });
    return events;
  } catch (error) {
    console.error('Ошибка при поиске событий:', error);
    throw error;
  }
};
router.post('/', async (req, res) => {
  try {
    const filters = req.body;
    console.log('Полученные фильтры:', filters);
    const events = await searchEvents(filters);
    res.json(events);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

module.exports = router;