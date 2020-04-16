const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to database
mongoose
  .connect('mongodb+srv://raresmigea:notsodark@cluster0-ptmqz.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

//middlewares
//when a request will hit the middlewares, shows it in terminal - morgan, parse it - bodyParser
app.use(morgan('dev'));			//what format should sync inside the terminal
app.use(bodyParser.json());		//must parse json

//routes
app.use('/users', require('./routes/users'));

//start the server

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is listening at ${port}`);
