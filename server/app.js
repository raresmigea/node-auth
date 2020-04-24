const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// mongoose.Promise = global.Promise;
//connect to database
mongoose
  .connect(
    'mongodb+srv://raresmigea:notsodark@cluster0-ptmqz.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(cookieParser());
app.use(
  cors({
    // what do we want to whitelist
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
