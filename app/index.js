require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const expressWs = require('express-ws')(app, server);

const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', (req, res, next) => res.send({ message: 'Hello world, I am the API' }));

app.use((err, req, res, next) => {
  if (!err.message || !err.code || err.code >= 500) {
    next(err);
  } else {
    res.status(err.code).send({ error: err.message });
  }
});

module.exports = { app, server };
