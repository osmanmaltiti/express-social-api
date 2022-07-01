import jwt from 'jsonwebtoken';

export const createSession = (data: string) => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      { data },
      process.env.ACCESSTOKEN as string,
      { expiresIn: '2 days' },
      (err, token) => {
        if (err) reject('Unable to create token');
        else resolve(token);
      }
    )
  );
};
