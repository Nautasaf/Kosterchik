const express = require('express')
const router = express.Router()
const { Event, EventUser } = require('../db/models')

// Маршрут для получения всех событий
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll()
    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ошибка при получении событий' })
  }
})

// Маршрут для получения событий конкретного пользователя
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    console.log('userId ===>', userId)

    // Находим все записи в таблице EventUser для данного пользователя
    const events = await Event.findAll({
      where: { userId },
    })

    res.status(200).json({ events })
  } catch (error) {
    console.error('Ошибка при получении событий пользователя:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})
// Получение события по ID
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findByPk(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' })
    }

    res.status(200).json(event)
  } catch (error) {
    console.error('Ошибка при получении события:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Редактирование события
router.put('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params
    const { title, description, city, date, background, requirements } =
      req.body

    const event = await Event.findByPk(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' })
    }

    // Обновляем поля
    await event.update({
      title,
      description,
      city,
      date,
      background,
      requirements,
    })

    res.status(200).json(event)
  } catch (error) {
    console.error('Ошибка при редактировании события:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Удаление события
router.delete('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params

    const event = await Event.findByPk(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' })
    }

    await event.destroy()

    res.status(200).json({ message: 'Событие удалено' })
  } catch (error) {
    console.error('Ошибка при удалении события:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router
