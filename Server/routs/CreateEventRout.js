const express = require('express')
const router = express.Router()
const { Event, EventUser } = require('../db/models')

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
    } = req.body
   
    // Проверяем, что userId передан и он не равен null
    if (!userId) {
      return res.status(400).json({ message: 'Ошибка: userId не указан' })
    }
    console.log('userId===>', userId)

    // Создаем событие в базе данных
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
    })

    // Добавляем создателя события в таблицу EventUser
    await EventUser.create({
      userId: userId,
      eventId: newEvent.id,
    })

    // Возвращаем созданное событие
    res.status(201).json(newEvent)
  } catch (error) {
    console.error("❌ Ошибка при создании события:", error);
    res.status(500).json({ message: "Ошибка сервера", error });
  }
});

module.exports = router
