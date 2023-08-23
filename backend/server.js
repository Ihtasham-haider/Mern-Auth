import express from 'express';
import Router from './routes/userRoutes.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './Middleware/errorMiddleware.js';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json('server is ready');
});
app.use(cookieParser());
app.use('/api/users', Router);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is working on port ${port}`);
});
