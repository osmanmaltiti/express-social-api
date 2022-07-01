import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';

const deletePost = async (req: CustomRequest, res: Response) => {
  const { id } = req.query;
  try {
    const deletePost = await prisma.post.delete({
      where: { id: String(id) },
    });
    res.status(200).json({ status: 'Success', data: deletePost });
  } catch (error) {
    res
      .status(400)
      .json({ status: 'Failed', message: 'Failed to delete post' });
  }
};

export default deletePost;
