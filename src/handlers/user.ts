import { userType } from '../../type';
import db from '../config/db';
import { users } from '../db/schema';

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getOneUser(id: string) {
  const allUsers = await db.select().from(users);
  const user = allUsers.find((user) => user.id === +id);
  if (user) {
    return `Email: ${user.email}\nName: ${user.first_name} ${user.last_name}\n`;
  }
}

export async function createUser(body: userType) {
  const hashPassword = await Bun.password.hash(body.password);
  const user = await db.insert(users).values({
    email: body.email,
    password: hashPassword,
    first_name: body.first_name,
    last_name: body.last_name,
    phone: body.phone,
    image_url: body.image_url,
  });
  return `User Has been Created`;
}
