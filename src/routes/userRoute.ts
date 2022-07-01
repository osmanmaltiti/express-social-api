import Express from 'express';
import createUser from '../controllers/Users/createUser';
import { getProfile } from '../controllers/Users/getProfile';
import getUser from '../controllers/Users/getUser';
import { verifyToken } from './../middlewares/verifyToken';

const router = Express.Router();

router.post('/register', createUser);

router.post('/login', getUser);

router.get('/profile', verifyToken, getProfile);

export default router;
