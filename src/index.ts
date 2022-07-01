import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import Express, { Application, Response } from 'express';
import morgan from 'morgan';
import PostRoute from './routes/postRoute';
import UserRoute from './routes/userRoute';

const app: Application = Express();
const port = (process.env.PORT as string) || 8000;
export const prisma = new PrismaClient();
// mongoose.connect('mongodb://localhost:27017/mockdb');

dotenv.config({
  path: '../.env',
});

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/post', PostRoute);

app.get('/', (_, res: Response) => res.send('Alive!'));

app.listen(port, () => console.log('Server is listening on port ' + port));
