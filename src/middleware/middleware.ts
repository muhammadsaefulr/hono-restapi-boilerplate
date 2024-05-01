import { Context, Hono, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export function errorHandler(error: Error): any {
  if (error instanceof HTTPException) {
    return error.getResponse();
  } else if (error instanceof ZodError) {
    return async (c: Context) => {
      c.json({ message: "error zod" });
    };
  }
}

export async function jwtSign(c: Context, next: Next) {
  const tokenAsynced = c.req.header("Authorization")?.split("")[1];
  // console.log("token detected : ", tokenAsynced);

  // if(!tokenAsynced){
  //   throw new HTTPException(501, {message: "Unauthorized !"})
  // }

  await next();
}
