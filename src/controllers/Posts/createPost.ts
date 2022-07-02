import { Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../..';
import { Post } from '../../../mongoose/Schema';
import { CustomRequest } from '../../@types';

const createPost = async (req: CustomRequest, res: Response) => {
  const postId = v4();
  const { post } = req.body;
  const uid = String(req.decode);

  try {
    const createPost = await prisma.post.create({
      data: {
        post,
        userId: uid,
        id: postId,
      },
    });

    const createNosqlPost = new Post({ postId, likes: [], unlikes: [] });
    await createNosqlPost.save();

    res.status(200).json({ status: 'Success', data: createPost });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'Failed', message: 'Failed to create post' });
  }
};

export default createPost;
