import { Request, Response } from 'express';
import { prisma } from '../..';
import { verifyPassword } from '../../helpers/encryption';
import { createSession } from '../../helpers/session';

const getUser = async (req: Request, res: Response) => {
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
