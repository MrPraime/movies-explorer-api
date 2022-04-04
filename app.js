require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandling');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { BD_DEV } = require('./utils/config');

const { PORT = 3000, NODE_ENV, BD_PROD } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? BD_PROD : BD_DEV, () => {
  console.log('Успех!');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(requestLogger);
app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
