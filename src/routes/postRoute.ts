import Express from 'express';
import createPost from '../controllers/Posts/createPost';
import {
  getAllPosts,
  getOthersPosts,
  getPostInteractionCount,
  getUserPosts,
} from '../controllers/Posts/getPost';
import { verifyToken } from './../middlewares/verifyToken';

const router = Express.Router();

router.post('/create-post', verifyToken, createPost);

router.get('/get-all-posts', verifyToken, getAllPosts);

router.get('/get-user-posts', verifyToken, getUserPosts);

router.get('/get-others-posts', verifyToken, getOthersPosts);

router.get('/get-interactions-count', verifyToken, getPostInteractionCount);

export default router;
