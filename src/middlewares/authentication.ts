import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../@types';
import { prisma } from '../index';

export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization) {
    const bearerToken = authorization.split(' ');
    const [_, token] = bearerToken;

    jwt.verify(
      token,
      process.env.ACCESSTOKEN as string,
      async (err, decode) => {
        if (err) {
          res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
        } else {
          const { data } = decode as JwtPayload;
          const uid = await prisma.user.findUnique({
            where: { email: data },
            select: { id: true },
          });

          if (uid) {
            req.decode = String(uid.id);
            next();
          } else {
            res.status(401).json({ status: 'Failed', message: 'Unauthorized' });
          }
        }
      }
    );
  }
};
