import * as bcrypt from 'bcrypt';

export async function hashString(s: string) {
  return await bcrypt.hash(s, 10);
}
