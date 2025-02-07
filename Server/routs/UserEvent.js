const express = require('express')
const router = express.Router()
const { Event, EventUser } = require('../db/models')

//роут для получения событии в истории которые создал пользователь 
router.get("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("Fetching events for user:", userId);
  
      const events = await Event.findAll({ where: { userId } });
  
      console.log("Events found:", events);
      res.json(events);
    } catch (error) {
      console.error("Error fetching user events:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });



module.exports = router