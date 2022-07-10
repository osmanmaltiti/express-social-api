import Express from 'express';
import createUser from '../controllers/Users/createUser';
import {
  followUser,
  getFollowStatus,
} from '../controllers/Users/followUnfollow';
import { getMiniProfile, getProfile } from '../controllers/Users/getProfile';
import getUser, { getPopularUsers } from '../controllers/Users/getUser';
import { authenticate } from '../middlewares/authentication';

const router = Express.Router();

router.post('/register', createUser);

router.post('/login', getUser);

router.post('/follow', authenticate, followUser);

router.post('/follow-status', authenticate, getFollowStatus);

router.get('/profile', authenticate, getProfile);

router.get('/mini-profile', authenticate, getMiniProfile);

router.get('/get-popular', authenticate, getPopularUsers);

export default router;
