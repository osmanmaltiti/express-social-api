import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';
import { User } from '../../mongoose/schema';

export const getProfile = async (req: CustomRequest, res: Response) => {
  const uid = String(req.decode);

  const userdata = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  res.status(200).json({ status: 'Success', data: userdata });
};

export const getMiniProfile = async (req: CustomRequest, res: Response) => {
  const uid = String(req.decode);

  const userdata = await prisma.user.findUnique({
    where: {
      id: uid,
    },
    select: {
      username: true,
      bio: true,
      createdAt: true,
    },
  });

  const follow = await User.findOne({ uid: String(uid) }).select({
    following: 1,
    followers: 1,
  });

  res.status(200).json({ status: 'Success', data: { userdata, follow } });
};
