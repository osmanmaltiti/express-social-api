import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const encryptPassword = (password: string): string => {
  const saltRounds: number = 8;
  const salt = genSaltSync(saltRounds);
  const encrypt = hashSync(password, salt);
  return encrypt;
};

export const verifyPassword = (
  loginPassword: string,
  hashedPassword: string
): boolean => {
  const verified = compareSync(loginPassword, hashedPassword);
  return verified;
};
