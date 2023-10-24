import express from 'express';
const mongoose = require('mongoose');
import cors from 'cors';
import router from './routes/userRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use('/', router);

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.status(200).send('website');
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
