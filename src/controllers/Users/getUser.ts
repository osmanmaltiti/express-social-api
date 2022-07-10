import { Response } from 'express';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';
import { verifyPassword } from '../../helpers/encryption';
import { createSession } from '../../helpers/session';

const getUser = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;

  const userdata = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userdata) {
    const verifiedPassword = verifyPassword(password, userdata.password);
    const token = await createSession(userdata.email);

    verifiedPassword
      ? res.status(200).json({ status: 'Success', id: userdata.id, token })
      : res
          .status(401)
          .json({ status: 'Failed', message: 'Invalid email or password' });
  } else {
    res
      .status(401)
      .json({ status: 'Failed', message: 'Invalid email or password' });
  }
};

export default getUser;

export const getPopularUsers = async (req: CustomRequest, res: Response) => {
  const userdata = await prisma.user.findMany({
    select: {
      fullname: true,
      email: true,
    },
  });

  userdata
    ? res.status(200).json({ status: 'Success', data: userdata })
    : res
        .status(401)
        .json({ status: 'Failed', message: 'Invalid email or password' });
};
