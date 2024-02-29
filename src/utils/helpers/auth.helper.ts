import * as argon2 from 'argon2';

export async function hashData(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function compareHashed(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}
