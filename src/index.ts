import { Elysia, t } from 'elysia';
import { createUser, getAllUsers, getOneUser } from './handlers/user';
import { userType } from '../type';

const app = new Elysia().get('/', () => 'Hello profit pulse');

// Get All the users
app.get('/users', getAllUsers);

app.get('/user/:id', ({ params: { id } }) => getOneUser(id));

app.post('/user', ({ body }) => createUser(body as userType), {
  body: t.Object({
    email: t.String(),
    first_name: t.String(),
    last_name: t.String(),
    password: t.String(),
    phone: t.String(),
    image_url: t.String(),
  }),
});

app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
