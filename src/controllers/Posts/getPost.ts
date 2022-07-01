import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { CustomRequest } from '../../@types';
import { prisma } from '../../index';

export const getAllPosts = async (_: any, res: Response) => {
  try {
    const post = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json({ state: 'Success', data: post });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res
        .status(Number(error.code))
        .json({ status: 'Failed', message: error.message });
    }
  }
};

export const getUserPosts = async (req: CustomRequest, res: Response) => {
  const uid = String(req.decode);

  try {
    const post = await prisma.post.findMany({
      where: { userId: uid },
      take: 5,
      include: {
        comments: true,
      },
    });

    res.json({ state: 'Success', data: post });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res
        .status(Number(error.code))
        .json({ status: 'Failed', message: error.message });
    }
  }
};

export const getOthersPosts = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const post = await prisma.user.findUnique({
      where: { email },
      select: {
        posts: {
          take: 10,
          include: {
            comments: true,
            likes: true,
            unlikes: true,
          },
        },
      },
    });

    post
      ? res.status(200).json({ state: 'Success', data: post })
      : res.status(400).json({ state: 'Failed', message: 'User Not Found' });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res
        .status(Number(error.code))
        .json({ status: 'Failed', message: error.message });
    }
  }
};

export const getPostInteractionCount = async (req: Request, res: Response) => {
  const { postId } = req.body;

  const commentsCount = await prisma.comment.count({
    where: { postId },
  });

  const likesCount = await prisma.like.count({
    where: { postId },
  });

  const unlikesCount = await prisma.comment.count({
    where: { postId },
  });

  res
    .status(200)
    .json({ status: 'Success', commentsCount, likesCount, unlikesCount });
};
