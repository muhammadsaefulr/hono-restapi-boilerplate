import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";



export function errorHandler(error: Error): any {
  if (error instanceof HTTPException) {
  return error.getResponse()
  } else if(error instanceof ZodError){
    return async (c: Context) => {
      c.json({message: "error zod"})
    }
  }
}
