import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';

export const getProfile = async (req: CustomRequest, res: Response) => {
  const uid = String(req.decode);

  const userdata = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  res.status(200).json({ status: 'Success', data: userdata });
};
