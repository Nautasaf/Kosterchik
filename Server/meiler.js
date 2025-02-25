const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,              
  secure: true, 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});


const sendRegistrationEmail = async (toEmail, username) => {
  try {
    await transporter.sendMail({
      from: `"Костёрчик" <${process.env.EMAIL}>`, 
      to: toEmail,  
      subject: 'Добро пожаловать в костёрчик!',
      html: `<h1>Привет, ${username}!</h1>
             <p>Вы успешно зарегистрировались на платформе "Костёрчик".</p>
             <p>Спасибо, что выбрали нас, можете наслаждаться всеми видами отдыха!!! </p>`,
    });

    console.log('Email отправлен:', toEmail);
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
  }
};

module.exports = sendRegistrationEmail;