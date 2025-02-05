const express = require('express');
const { UserFavorite, Event } = require('../db/models');
const router = express.Router();


router.post('/add-to-favorites', async (req, res) => {
  const { userId, eventId } = req.body;
 console.log(req.body);
 
    
  
  
  try {
    const existingFavorite = await UserFavorite.findOne({
      where: { userId, eventId }
    });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Это событие уже в избранном' });
    }
    await UserFavorite.create({ userId, eventId });
    return res.status(200).json({ message: 'Событие добавлено в избранное' });
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error);
    return res.status(500).json({ error: 'Ошибка при добавлении в избранное' });
  }
});


router.delete('/remove', async (req, res) => {
  const { userId, eventId } = req.body;
console.log("пришло ", req.body);

  try {
    const deleted = await UserFavorite.destroy({
      where: { userId, eventId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Избранное не найдено' });
    }

    return res.status(200).json({ message: 'Удалено успешно' });
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try { 
    const favorites = await UserFavorite.findAll({
      where: { userId },
      include: [{ model: Event }]
    });
    if (!favorites.length) {
      return res.status(404).json({ message: 'Нет избранных событий' });
    }
    return res.status(200).json(favorites);
  } catch (error) {
    console.error('Ошибка при получении избранных событий:', error);
    return res.status(500).json({ error: 'Ошибка при получении избранных событий' });
  }
});

module.exports = router;