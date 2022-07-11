import Express from 'express';
import { createComment } from '../controllers/Interactions/createComment';
import { deleteComment } from '../controllers/Interactions/deleteComment';
import { getComments } from '../controllers/Interactions/getComment';
import { likePost, unlikePost } from '../controllers/Interactions/likeUnlike';
import { createImagePost, createPost } from '../controllers/Posts/createPost';
import deletePost from '../controllers/Posts/deletePost';
import {
  getAllPosts,
  getImage,
  getOthersPosts,
  getPostInteractionCount,
  getUserPosts,
} from '../controllers/Posts/getPost';
import { authenticate } from '../middlewares/authentication';

const router = Express.Router();

router.post('/create-post', authenticate, createPost);

router.post('/create-image-post', authenticate, createImagePost);

router.post('/create-comment', authenticate, createComment);

router.post('/like-post', authenticate, likePost);

router.post('/unlike-post', authenticate, unlikePost);

router.get('/get-image', getImage);

router.get('/get-all-posts', authenticate, getAllPosts);

router.get('/get-user-posts', authenticate, getUserPosts);

router.get('/get-others-posts', authenticate, getOthersPosts);

router.get('/get-comments', authenticate, getComments);

router.get('/get-interactions-count', authenticate, getPostInteractionCount);

router.delete('/delete-post', authenticate, deletePost);

router.delete('/delete-comment', authenticate, deleteComment);

export default router;
