const express = require('express');
const process = require('process');

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);