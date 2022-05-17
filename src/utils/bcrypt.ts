import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export function hashPassword(rawPassword: string): string {
  const SALT = genSaltSync();
  return hashSync(rawPassword, SALT);
}

export function comparePassword(
  rawPassword: string,
  hashPassword: string,
): boolean {
  return compareSync(rawPassword, hashPassword);
}
