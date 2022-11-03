const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');

const {
  PORT = 3000,
  CONNECTION_STRING = 'mongodb://localhost:27017/moviesdb',
} = process.env;

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(router);
app.listen(PORT);
