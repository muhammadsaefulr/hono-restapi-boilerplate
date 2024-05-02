import { password } from "bun";
import { z } from "zod";

export class userSchemaZod {
  static readonly user = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  static readonly userAuth = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  static readonly userUpdate = z.object({
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional()
  })
}
