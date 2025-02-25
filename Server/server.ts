require('dotenv').config({ path: './.env' })
const https = require('https')
const fs = require('fs')
const express = require('express')
const serverConfig = require('./serverConfig')
const server = express()
const db = require('./db/models/index')
const socketIo = require('socket.io');
const { EventMessage, User } = require('./db/models');

// Создание папки uploads, если она не существует
const dir = './uploads'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

serverConfig(server)


async function testConnection() {
  try {
    await db.sequelize.authenticate()
    console.log('БД подключена успешно')
  } catch (error) {
    console.log('Ошибка подключения к БД', error)
  }
}

testConnection()

// Добавляем WebSocket
const httpServer = require('http').createServer(server);
const io = socketIo(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://kosterchik.ru"], // Разрешаем доступ только с этого домена
      methods: ["GET", "POST"],
    }
});

// Обработчик подключения для чата
io.on('connection', (socket: any) => {
    console.log('Пользователь подключился');

    socket.on('join event', (eventId: any) => {
        socket.join(`event-${eventId}`);
        console.log(`Пользователь подключен к событию ${eventId}`);
    });

    socket.on('sendMessage', async (data: any) => {
        try {
            const { userId, eventId, text } = data;
    
            if (!userId || !eventId || !text) {
                throw new Error('User ID, Event ID, and Text are required');
            }
    
            // Загружаем информацию о пользователе
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            // Сохраняем сообщение
            const message = await EventMessage.create({
                user_id: userId,
                event_id: eventId,
                text: text,
            });
    
            console.log('Message saved:', message);
    
            // Отправляем сообщение всем подключенным клиентам
            io.to(`event-${eventId}`).emit('newMessage', {
                ...message.dataValues,
                username: user.username, // Добавляем имя пользователя в сообщение
            });
    
        } catch (error: any) {
            console.error('Error saving message:', error.message);
        }
    });
    socket.on('load messages', async (eventId: any) => {
        try {
            const messages = await EventMessage.findAll({
                where: { event_id: eventId },
                include: [{ model: db.User, attributes: ['username', 'email'] }],
            });
    
            console.log('Loaded messages:', messages);
            
            // Преобразуем данные в простой массив для отправки
            const formattedMessages = messages.map((msg: any) => ({
                text: msg.text,
                username: msg.User ? msg.User.username : 'Unknown', // Имя пользователя или 'Unknown'
                createdAt: msg.createdAt,
            }));
    
            // Отправляем преобразованные сообщения
            socket.emit('load messages', formattedMessages);
        } catch (err) {
            console.error('Ошибка при загрузке сообщений:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

const registration = require('./routs/RegistrationRout');
const loginRouter = require('./routs/LoginRout');
const logout = require('./routs/Logout');
const uploadRoute = require('./routs/UploadRoute');
const favorites = require('./routs/Favorite');
const eventRout = require('./routs/EventRout');
const searchRout = require('./routs/SearchRout');
const getUsers = require('./routs/GetAllUser');
const userEvent = require('./routs/UserEvent');
const infoUser = require('./routs/InfoUser');

server.use('/events', eventRout);
server.use('/search', searchRout);
server.use('/', registration, loginRouter, logout, uploadRoute);
server.use('/users', getUsers);
server.use('/favorites', favorites);
server.use('/user-event', userEvent);
server.use('/info', infoUser);

// Добавьте определение переменной PORT
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
});
