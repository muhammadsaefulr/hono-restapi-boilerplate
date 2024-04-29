import { Context, Hono } from "hono";
import userHandler from "../handler/userHandler";

const users = new Hono();

users.get('/find/:id', (c) => userHandler.userFindById(c))
users.post('/register', (c) => userHandler.regsiterUser(c))
users.put('/update/:id', (c) => userHandler.updateUser(c))
users.delete('/delete/:id', (c) => userHandler.deleteUser(c))

export default users