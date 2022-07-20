import { Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';
import { Post } from '../../mongoose/schema';

export const createPost = async (req: CustomRequest, res: Response) => {
  const postId = v4();
  const { post } = req.body;
  const imagePost = req.file;
  const uid = String(req.decode);

  try {
    const getProfile = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    if (getProfile) {
      const { username, fullname } = getProfile;
      const createPost = await prisma.post.create({
        data: {
          id: postId,
          userId: uid,
          userName: username,
          fullName: fullname,
          post: post ? post : '',
          media: imagePost ? `${username}/${imagePost.filename}` : '',
        },
      });

      const createNosqlPost = new Post({ postId, likes: [], unlikes: [] });
      await createNosqlPost.save();

      res.status(200).json({ status: 'Success', data: createPost });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 'Failed', message: 'Failed to create post' });
  }
};
