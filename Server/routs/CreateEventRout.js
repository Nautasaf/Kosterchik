const express = require('express')
const router = express.Router()
const { Event, EventUser } = require('../db/models')

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
    })

    // Добавляем создателя события в таблицу EventUser
    await EventUser.create({
      userId: userId,
      eventId: newEvent.id,
    })

    // Возвращаем созданное событие
    res.status(201).json(newEvent)
  } catch (error) {
    console.error('Ошибка при создании события:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router
