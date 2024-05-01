import { Hono } from 'hono'
import users from './router/userRoutes'
import { errorHandler, jwtSign } from './middleware/middleware'
const app = new Hono()
 
app.use(jwtSign)
app.onError(errorHandler);

app.route("/users", users)
app.get('/', (c) => c.json({message: "Hello World !"}))


Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 4000
})