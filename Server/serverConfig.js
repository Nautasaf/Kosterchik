const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const sessionConfig = {
  store: new FileStore(),
  name: 'loginedUser',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
    sameSite: 'lax', // Для работы с CORS
    secure: process.env.NODE_ENV === 'production',
  },
}

const corsOptions = {
  origin(origin, callback) {
    // Список разрешенных доменов
    const allowedOrigins = ['http://localhost:5173', 'https://kosterchik.ru'];

    // Нормализация origin (удаление лишних пробелов)
    const normalizedOrigin = origin?.trim();

    // Проверяем, входит ли origin в список разрешенных
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true); // Разрешаем доступ
    } else {
      // Отказываем в доступе с кодом 403
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Массив методов
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  credentials: true, // Разрешаем использование кук и аутентификационных данных
  optionsSuccessStatus: 204, // Код ответа для предварительных запросов
};

const serverConfig = (server) => {
  server.use(morgan('tiny'))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(cors(corsOptions));
  server.options('*', cors(corsOptions));
  server.use(express.static('public'))
  server.use(bodyParser.json())
  server.use(cookieParser(process.env.SESSION_SECRET || 'secret'))
  server.use(session(sessionConfig))
}

module.exports = serverConfig