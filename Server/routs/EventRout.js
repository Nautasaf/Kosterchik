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
