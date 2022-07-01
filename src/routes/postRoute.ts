import Express from 'express';
import { createComment } from '../controllers/Interactions/createComment';
import { deleteComment } from '../controllers/Interactions/deleteComment';
import { getComments } from '../controllers/Interactions/getComment';
import createPost from '../controllers/Posts/createPost';
import deletePost from '../controllers/Posts/deletePost';
import {
  getAllPosts,
  getOthersPosts,
  getPostInteractionCount,
  getUserPosts,
} from '../controllers/Posts/getPost';
import { authenticate } from '../middlewares/authentication';

const router = Express.Router();

router.post('/create-post', authenticate, createPost);

router.post('/create-comment', authenticate, createComment);

router.get('/get-all-posts', authenticate, getAllPosts);

router.get('/get-user-posts', authenticate, getUserPosts);

router.get('/get-others-posts', authenticate, getOthersPosts);

router.get('/get-comments', authenticate, getComments);

router.get('/get-interactions-count', authenticate, getPostInteractionCount);

router.delete('/delete-post', authenticate, deletePost);

router.delete('/delete-comment', authenticate, deleteComment);

export default router;
