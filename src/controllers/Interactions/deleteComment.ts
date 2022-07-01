import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';

export const deleteComment = async (req: CustomRequest, res: Response) => {
  const { id } = req.query;

  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ status: 'Success', data: deletedComment });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ status: 'Failed', message: error.meta?.cause });
    }
  }
};
