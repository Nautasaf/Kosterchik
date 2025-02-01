const router = require('express').Router();

router.post('/logout', (req, res) => {
  if (!req.session ) {
    return res.status(400).json({ message: 'Сессия не найдена или пользователь не авторизован' });
  }

  // console.log('До удаления сессии:', req.session);

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выходе' });
    }
    // const sessionFile = path.join(__dirname, 'sessions', `sess_${req.sessionID}`);
    // fs.unlink(sessionFile, (err) => {
    //   if (err) {
    //     console.error('Ошибка при удалении файла сессии:', err);
    //   }
    // });

   
    res.clearCookie('loginedUser', { path: '/' }); 
    res.clearCookie('connect.sid', { path: '/' }); 

   
    return res.json({ message: 'Вы успешно вышли' });
  });
});

module.exports = router;