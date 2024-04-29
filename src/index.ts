import { Hono } from 'hono'
import users from './router/userRoutes'
import { HTTPException } from 'hono/http-exception'
import { errorHandler } from './middleware/middleware'
const app = new Hono()

app.route("/users", users)
// app.onError(errorHandler)

app.get('/', (c) => c.json({message: "Hello World !"}))

app.onError(errorHandler)

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 4000
})
