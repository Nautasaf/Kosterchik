require('dotenv').config({ path: './.env' });
const path = require('path');
const express = require('express');
const serverConfig = require('./serverConfig');
const server = express();
const db = require('./db/models/index'); 

serverConfig(server);
 
async function testConnection() {
    try {
    await db.sequelize.authenticate(); 
    console.log('БД подключена успешно');
    } catch (error) {
    console.log('Ошибка подключения к БД', error.message);
    }
    }
    testConnection()

const registration = require('./routs/RegistrationRout');
const loginRouter = require('./routs/LoginRout')
const logout = require('./routs/Logout')
const eventRout = require('./routs/EventRout')
const searchRout = require('./routs/SearchRout')


    server.use('/', registration, loginRouter, logout);
    server.use('/events', eventRout)
    server.use('/search', searchRout)

    
  


server.listen(process.env.PORT || 3000, () => {
  console.log('Server is working ');
});
