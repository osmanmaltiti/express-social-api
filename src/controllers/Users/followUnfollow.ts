import { Response } from 'express';
import createHttpError from 'http-errors';
import { prisma } from '../..';
import { CustomRequest } from '../../@types';
import { User } from '../../mongoose/schema';

const userNotFound = new createHttpError.BadRequest();

export const followUser = async (req: CustomRequest, res: Response) => {
  const { email } = req.body;
  const uid = String(req.decode);

  try {
    const targetUser = await prisma.user.findUnique({
      where: { email },
    });

    if (targetUser) {
      const targetuser = await User.findOne({ uid: targetUser.id });
      const currentuser = await User.findOne({ uid });

      if (targetuser) {
        const isAfollower = targetuser.followers?.some((item) => item === uid);

        if (isAfollower) {
          const updateTargetFollowers = targetuser.followers?.filter(
            (item) => item !== uid
          );

          const updateUserFollowing = currentuser?.following?.filter(
            (item) => item !== targetUser.id
          );

          await User.updateOne(
            { uid: targetUser.id },
            { followers: updateTargetFollowers }
          );
          await User.updateOne({ uid }, { following: updateUserFollowing });
        } else {
          const targetFollowers = targetuser.followers as [];
          const userFollowing = currentuser?.following as [];

          await User.updateOne(
            { uid: targetUser.id },
            { followers: [...targetFollowers, uid] }
          );
          await User.updateOne(
            { uid },
            { following: [...userFollowing, targetUser.id] }
          );
        }
      }
    } else {
      userNotFound.message = 'User Not Found';
      userNotFound.status = 400;
      throw userNotFound;
    }
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res
        .status(error.status)
        .json({ status: 'Failed', message: error.message });
    }
  }
};
