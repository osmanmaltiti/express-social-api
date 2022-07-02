import { Response } from 'express';
import createHttpError from 'http-errors';
import { Post } from '../../../mongoose/Schema';
import { CustomRequest } from '../../@types';

const postNotFound = new createHttpError.BadRequest();

export const likePost = async (req: CustomRequest, res: Response) => {
  const { postId } = req.body;
  const uid = String(req.decode);

  try {
    const post = await Post.findOne({ postId });

    if (post) {
      const hasLikedPost = post.likes?.some((item) => item === uid);
      const hasUnlikedPost = post.unlikes?.some((item) => item === uid);

      if (hasLikedPost) {
        const removeLike = post.likes?.filter((item) => item !== uid);
        const updateLikes = await Post.updateOne(
          { postId },
          { likes: removeLike }
        );

        res
          .status(200)
          .json({ status: 'Success', data: updateLikes.acknowledged });
      } else {
        const postLikes = post.likes as [];
        const liked = await Post.updateOne(
          { postId },
          { likes: [...postLikes, uid] }
        );

        if (hasUnlikedPost) {
          const removeUnlike = post.unlikes?.filter((item) => item !== uid);
          await Post.updateOne({ postId }, { unlikes: removeUnlike });
        }

        res.status(200).json({ status: 'Success', data: liked.acknowledged });
      }
    } else {
      postNotFound.message = 'Post Not Found';
      throw postNotFound;
    }
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res
        .status(error.status)
        .json({ status: 'Failed', message: error.message });
    }
  }
};

export const unlikePost = async (req: CustomRequest, res: Response) => {
  const { postId } = req.body;
  const uid = String(req.decode);

  try {
    const post = await Post.findOne({ postId });

    if (post) {
      const hasUnlikedPost = post.unlikes?.some((item) => item === uid);
      const hasLikedPost = post.likes?.some((item) => item === uid);

      if (hasUnlikedPost) {
        const removeUnlike = post.unlikes?.filter((item) => item !== uid);
        const updateUnlikes = await Post.updateOne(
          { postId },
          { unlikes: removeUnlike }
        );

        res
          .status(200)
          .json({ status: 'Success', data: updateUnlikes.acknowledged });
      } else {
        const postUnlikes = post.unlikes as [];
        const unliked = await Post.updateOne(
          { postId },
          { unlikes: [...postUnlikes, uid] }
        );

        if (hasLikedPost) {
          const removeLike = post.likes?.filter((item) => item !== uid);
          await Post.updateOne({ postId }, { likes: removeLike });
        }

        res.status(200).json({ status: 'Success', data: unliked.acknowledged });
      }
    } else {
      postNotFound.message = 'Post Not Found';
      throw postNotFound;
    }
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res
        .status(error.status)
        .json({ status: 'Failed', message: error.message });
    }
  }
};
