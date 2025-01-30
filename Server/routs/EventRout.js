const express = require('express');
const {Event} = require('../db/models')
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении событий' });
  }
});

module.exports = router;