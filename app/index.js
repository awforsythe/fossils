require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const expressWs = require('express-ws')(app, server);

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const wsRouter = require('./routes/ws');
const apiRouter = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ws', wsRouter);
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (!err.message || !err.code || err.code >= 500) {
    next(err);
  } else {
    res.status(err.code).send({ error: err.message });
  }
});

module.exports = { app, server };
