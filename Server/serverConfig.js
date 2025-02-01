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
    const isAllowedOrigin = ['http://localhost:5173', 'https://kosterchik.ru'].includes(origin)

    if (!origin || isAllowedOrigin) {
      callback(null, true)
    } else {
      const error = ApiError.BadRequestError('Not allowed by CORS')
      callback(error)
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}

const serverConfig = (server) => {
  server.use(morgan('tiny'))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(cors(corsOptions))
  server.use(express.static('public'))
  server.use(bodyParser.json())
  server.use(cookieParser(process.env.SESSION_SECRET || 'secret'))
  server.use(session(sessionConfig))
}

module.exports = serverConfig
