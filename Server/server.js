"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config({ path: './.env' });
const express = require('express');
const serverConfig = require('./serverConfig');
const server = express();
const db = require('./db/models/index');
serverConfig(server);
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.sequelize.authenticate();
            console.log('БД подключена успешно');
        }
        catch (error) {
            if (error instanceof Error) { // Проверяем, является ли ошибка экземпляром класса Error
                console.log('Ошибка подключения к БД', error.message); // Теперь TypeScript знает, что у нас есть свойство message
            }
            else {
                console.error('Неизвестная ошибка:', error);
            }
        }
    });
}
testConnection();
const registration = require('./routs/RegistrationRout');
const loginRouter = require('./routs/LoginRout');
const logout = require('./routs/Logout');
server.use('/', registration, loginRouter, logout);
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is working ');
});
