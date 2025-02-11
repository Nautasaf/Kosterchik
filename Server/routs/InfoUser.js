const router = require('express').Router();
const { log } = require('console');
const { User, EventUser, UserFavorite } = require('../db/models'); 
const nodemailer = require('nodemailer');
require('dotenv').config();2


const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,              
  secure: true, 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});


router.post('/', async (req, res) => {
    const { userId, eventId } = req.body;
    console.log(`Одобрение участника: ${userId} для события: ${eventId}`);
    
    try {
      // Ищем участника в таблице UserFavorite
      const userFavorite = await UserFavorite.findOne({
        where: { userId, eventId },
      });
      
      if (!userFavorite) {
        return res.status(400).send('Участник не найден в избранном');
      }
  
      // Находим пользователя, который связан с этим userId
      const user = await User.findOne({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(400).send('Пользователь не найден');
      }
  
      // Находим событие по eventId
      const event = await Event.findByPk(eventId);
      
      if (!event) {
        return res.status(400).send('Событие не найдено');
      }
  
      // Получаем название события
      const eventTitle = event.title;
  
      // Отправляем email пользователю
      await transporter.sendMail({
        from: `"Костёрчик" <${process.env.EMAIL}>`, 
        to: user.email,  
        subject: `Ваше участие в событии "${eventTitle}" подтверждено`,
        html: `<h1>Привет, ${user.username}!</h1>
               <p>Вы были одобрены для участия в событии "${eventTitle}". Мы рады, что вы с нами!</p>`,
      });
  
      console.log('Email отправлен:', user.email);
  
      // Возвращаем успешный ответ
      return res.status(200).send('Участник успешно одобрен, email отправлен');
    } catch (error) {
      console.error('Ошибка при одобрении участника:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

  router.post('/reject', async (req, res) => {
    const { userId, eventId } = req.body;
    console.log(userId, eventId);
  
    try {
      // Находим пользователя в базе данных
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(400).send('Пользователь не найден');
      }
  
      const userFavorite = await UserFavorite.findOne({
        where: { userId, eventId },
      });
  
      if (!userFavorite) {
        return res.status(400).send('Участник не найден в избранном');
      }
  
      // Находим событие по eventId
      const event = await Event.findByPk(eventId);
      
      if (!event) {
        return res.status(400).send('Событие не найдено');
      }
  
      // Получаем название события
      const eventTitle = event.title;
  
      // Отправляем email об отказе
      await transporter.sendMail({
        from: `"Костёрчик" <${process.env.EMAIL}>`, 
        to: user.email,  
        subject: 'Отказ от участия',
        html: `<h1>Здравствуйте, ${user.username}!</h1>
               <p>Мы сожалеем, но ваше участие в событии "${eventTitle}" было отклонено.</p>
               <p>Спасибо за понимание и надеемся на ваше участие в других событиях.</p>`,
      });
  
      // Удаляем запись из избранного
      await userFavorite.destroy();
  
      // Возвращаем успешный ответ
      return res.status(200).send('Участник успешно удален из избранного');
    } catch (error) {
      console.error('Ошибка при отказе участника:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

module.exports = router