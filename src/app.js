const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const { defaultConnectionString } = require('./consts/mongoDb');

require('dotenv').config();

const {
  PORT = 3000,
  CONNECTION_STRING = defaultConnectionString,
} = process.env;

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(router);
app.listen(PORT);
