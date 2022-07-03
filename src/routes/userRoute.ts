import Express from 'express';
import createUser from '../controllers/Users/createUser';
import { followUser } from '../controllers/Users/followUnfollow';
import { getProfile } from '../controllers/Users/getProfile';
import getUser from '../controllers/Users/getUser';
import { authenticate } from '../middlewares/authentication';

const router = Express.Router();

router.post('/register', createUser);

router.post('/login', getUser);

router.post('/follow', authenticate, followUser);

router.get('/profile', authenticate, getProfile);

export default router;
