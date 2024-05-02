import { Context, Hono, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { verify } from "hono/jwt";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { ResponseError } from "../errorHandle/responseError";

export function errorHandler(error: Error) {
  if (error instanceof HTTPException) {
    return Response.json({ message: error.message }, { status: error.status });
  } else if (error instanceof ResponseError) {
    return Response.json({ message: error.message }, { status: error.status });
  }
  return new Response(error.message);
}

export async function jwtSign(c: Context, next: Next) {
  const tokenAsynced = c.req.header("Authorization")?.split("")[1];
  const secret = process.env.SECRET_JWT_KEY;

  if (!secret) {
    throw new HTTPException(500, {
      message: "Internal Server Error, JWT Are Needs KEY !",
    });
  }

  console.log(tokenAsynced);

  if (!tokenAsynced) {
    throw new HTTPException(501, {
      message: "Unauthorized, Need JWT Token !",
    });
  }


  await next();
}
