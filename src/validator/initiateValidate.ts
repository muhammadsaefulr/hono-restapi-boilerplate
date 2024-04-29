import { z } from "zod";

export class userSchemaZod {
  static readonly user = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  static readonly userAuth = z.object({
    email: z.string(),
    password: z.string(),
  });
}
