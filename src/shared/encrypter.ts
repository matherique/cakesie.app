import bcrypt from "bcryptjs";

export async function hash(text: string): Promise<string> {
  return await bcrypt.hash(text, 10);
}

export function compare(hashed: string, target: string): boolean {
  return bcrypt.compareSync(target, hashed);
}
