import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import Express, { Application } from 'express';
import { existsSync, mkdirSync } from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import PostRoute from './routes/postRoute';
import UserRoute from './routes/userRoute';

const app: Application = Express();
const port = (process.env.PORT as string) || 8000;
export const prisma = new PrismaClient();
mongoose.connect('mongodb://0.0.0.0:27017/mockdb');

dotenv.config({
  path: '../.env',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { username } = req.headers;
    const userpath = path.resolve(__dirname, `../public/images/${username}`);

    if (!existsSync(userpath)) mkdirSync(userpath);

    callback(null, userpath);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

app.use(cors());
app.use(morgan('dev'));
app.use(multer({ storage: fileStorage }).single('image'));
app.use(Express.json());
app.use(Express.static(path.join(__dirname, '../public/images')));

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/post', PostRoute);

app.listen(port, () => console.log('Server is listening on port ' + port));
