import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../..';
import { User } from '../../../mongoose/Schema';
import { encryptPassword } from '../../helpers/encryption';
import { createSession } from '../../helpers/session';

const createUser = async (req: Request, res: Response) => {
  const uid = v4();
  const { fullname, email, username, password, age, bio } = req.body;

  try {
    const encryptedPassword = encryptPassword(password);
    const createdUser = await prisma.user.create({
      data: {
        id: uid,
        fullname,
        email,
        username,
        password: encryptedPassword,
        age,
        bio,
      },
    });

    const token = await createSession(email);
    const createNosqlUser = new User({
      uid: createdUser.id,
      followers: [],
      following: [],
    });
    await createNosqlUser.save();

    res.json({ status: 'Success', uid: createdUser.id, token });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.json({
          status: 'Failed',
          message: error.meta?.target + ' already exists',
        });
      }
    }
  }
};
export default createUser;
