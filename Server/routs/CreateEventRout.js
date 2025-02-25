const express = require('express');
const router = express.Router();
const { Event, EventUser } = require('../db/models');

router.post('/', async (req, res) => {
  console.log("📥 Полученные данные на сервере:", req.body);

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
      maxPeople,
      start_date,
      end_date,
      price,
      event_type,
      age_restriction,
      duration,
      district,
      format,
      language,
      accessibility,
      organizer,
      latitude,
      longitude,
      markerIcon
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
      people: 1,
      maxPeople,
      start_date,
      end_date,
      price,
      event_type,
      age_restriction,
      duration,
      district,
      format,
      language,
      accessibility,
      organizer,
      latitude,
      longitude,
      markerIcon
    });

    await EventUser.create({
      userId: userId,
      eventId: newEvent.id,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ Ошибка при создании события:", error);
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

module.exports = router;
