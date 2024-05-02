import { Hono } from "hono";
import users from "./router/userRoutes";
import { errorHandler, jwtSign } from "./middleware/middleware";
import userHandler from "./handler/userHandler";
import { logger } from "hono/logger";
const app = new Hono();

app.onError(errorHandler);
app.get("/", (c) => c.json({ message: "Hello World !" }));
app.post("/auth", (c) => userHandler.authUser(c));

app.use("*", logger());

app.use(jwtSign);
app.route("/users", users);

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 4000,
});
