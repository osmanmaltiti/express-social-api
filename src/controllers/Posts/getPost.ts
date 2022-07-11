import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import path from 'path';
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

export const getImage = async (req: CustomRequest, res: Response) => {
  const { imageurl } = req.query;

  res.sendFile(path.join(__dirname, `../../../public/images/${imageurl}`));
};

export const getPostInteractionCount = async (
  req: CustomRequest,
  res: Response
) => {
  const uid = String(req.decode);
  const { postId } = req.query;
  try {
    const post = await prisma.post.findUnique({
      where: { id: String(postId) },
    });

    if (post) {
      const commentsCount = await prisma.comment.count({
        where: { postId: String(postId) },
      });

      const likesUnlikes = await Post.findOne({ postId: String(postId) });

      if (likesUnlikes) {
        const { likes, unlikes } = likesUnlikes;

        if (likes && unlikes) {
          const likesCount = likes.length;
          const unlikesCount = unlikes.length;
          const hasLiked = likes.some((item) => item === uid);
          const hasUnliked = unlikes.some((item) => item === uid);

          res.status(200).json({
            status: 'Success',
            commentsCount,
            likesCount,
            unlikesCount,
            hasLiked,
            hasUnliked,
          });
        }
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
