import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { CustomRequest } from '../../@types';
import { prisma } from '../../index';
import { Post } from '../../mongoose/schema';

export const getAllPosts = async (req: CustomRequest, res: Response) => {
  const { skip } = req.query;

  try {
    const post = await prisma.post.findMany({
      take: 10,
      skip: Number(skip),
      orderBy: {
        createdAt: 'desc',
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
  const { skip } = req.query;

  try {
    const post = await prisma.post.findMany({
      where: { userId: uid },
      take: 10,
      skip: Number(skip),
      orderBy: {
        createdAt: 'desc',
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
  const { skip } = req.query;

  try {
    const post = await prisma.user.findUnique({
      where: { email },
      select: {
        posts: {
          take: 10,
          skip: Number(skip),
          orderBy: {
            createdAt: 'desc',
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
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (post) {
      const commentsCount = await prisma.comment.count({
        where: { postId },
      });

      const likesUnlikes = await Post.findOne({ postId });

      if (likesUnlikes) {
        const likesCount = likesUnlikes.likes?.length;
        const unlikesCount = likesUnlikes.unlikes?.length;

        res
          .status(200)
          .json({ status: 'Success', commentsCount, likesCount, unlikesCount });
      }
    } else {
      res.status(400).json({ status: 'Failed', message: 'Post Not Found' });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ status: 'Failed', message: error.meta?.cause });
    }
  }
};
