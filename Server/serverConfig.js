const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const bodyParser = require('body-parser');



const sessionConfig = {
  store: new FileStore(),
  name: 'loginedUser',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  // clear_interval: 36,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    path: '/',
    httpOnly: true,
  },
};

const serverConfig = (server) => {
  server.use(morgan('tiny'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(
    cors({
      origin: 'http://localhost:5173',
      methods: 'GET, POST, PUT, DELETE',
      // allowedHeaders:
      //   'Origin, Accept, X-Requested-With, Content-Type, Authorization',
      credentials: true,
    })
  );
  server.use(express.static('public'));
  server.use(bodyParser.json());
  server.use(session(sessionConfig));

};

module.exports = serverConfig;
