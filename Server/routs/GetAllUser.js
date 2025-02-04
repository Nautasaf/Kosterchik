const express = require('express');
const { User } = require('../db/models'); 

const router = express.Router();


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка на сервере' });
  }
});



module.exports = router;