import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';

export const getComments = async (req: CustomRequest, res: Response) => {
  const { postId } = req.query;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: String(postId) },
      take: 10,
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json({ state: 'Success', data: comments });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ status: 'Failed', message: error.meta?.cause });
    }
  }
};
