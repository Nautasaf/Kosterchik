const express = require('express');
const router = express.Router();
const { Event } = require('../db/models');

// Создание события
router.post('/', async (req, res) => {
  const { title, description, city, date, userId, imageUrl, background, requirements } = req.body;

  try {
    const newEvent = await Event.create({
      title,
      description,
      city,
      date,
      userId,
      imageUrl,
      background,
      requirements,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Ошибка при создании события:', error);
    res.status(500).json({ message: 'Ошибка при создании события' });
  }
});

module.exports = router;