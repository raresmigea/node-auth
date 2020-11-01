import express, { json } from 'express';
import morgan from 'morgan';
import { connect } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// connect to database
connect('mongodb+srv://raresmigea:notsodark@cluster0-ptmqz.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

app.use(json());

// Routes
app.use('/users', require('./routes/users'));

export default app;
