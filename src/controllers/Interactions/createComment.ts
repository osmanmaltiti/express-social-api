import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';

export const createComment = async (req: CustomRequest, res: Response) => {
  const { postId, comment, media } = req.body;
  const uid = String(req.decode);

  try {
    const createdComment = await prisma.comment.create({
      data: {
        postId,
        media,
        comment,
        userId: uid,
      },
    });

    res.status(200).json({ status: 'Success', data: createdComment });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ status: 'Failed', message: error.meta?.cause });
    }
  }
};
