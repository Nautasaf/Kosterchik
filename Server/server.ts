require('dotenv').config({ path: './.env' })
const https = require('https')
const fs = require('fs')
const express = require('express')
const serverConfig = require('./serverConfig')
const server = express()
const db = require('./db/models/index')
const registration = require('./routs/RegistrationRout')
const loginRouter = require('./routs/LoginRout')
const logout = require('./routs/Logout')
const uploadRoute = require('./routs/UploadRoute')
const CreateEventRout = require('./routs/CreateEventRout')
const favorites = require('./routs/Favorite')

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

const eventRout = require('./routs/EventRout')
const searchRout = require('./routs/SearchRout')
const getUsers = require('./routs/GetAllUser')
server.use('/events', eventRout)
server.use('/search', searchRout)
server.use('/', registration, loginRouter, logout, uploadRoute)
server.use('/events', CreateEventRout)
server.use('/users', getUsers)
server.use('/favorites', favorites)


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`)
})
