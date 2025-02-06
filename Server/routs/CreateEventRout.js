const express = require('express');
const router = express.Router();
const { Event, EventUser } = require('../db/models');

router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      date,
      userId,
      imageUrl,
      background,
      requirements,
      latitude,
      longitude,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Ошибка: userId не указан' });
    }
    console.log('userId===>', userId);

    const newEvent = await Event.create({
      title,
      description,
      city,
      date,
      userId,
      imageUrl,
      background,
      requirements,
      latitude,
      longitude,
    });

    await EventUser.create({
      userId: userId,
      eventId: newEvent.id,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Ошибка при создании события:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
