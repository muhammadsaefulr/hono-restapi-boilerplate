import { PrismaClient } from "@prisma/client";

import { sign } from "hono/jwt";

const prisma = new PrismaClient();

class userService {
  static userFindById = async (userId: number) => {
    const req = await prisma.userModel.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        password: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    return req;
  };

  static findUserByEmail = async (email: string) => {
    const req = await prisma.userModel.findUnique({
      where: {
        email: email,
      },
    });

    return req;
  };

  static findUserByUsername = async (name: string) => {
    const req = await prisma.userModel.findMany({
      where: {
        username: name,
      },
    });

    return req;
  };

  static registerUser = async (req: User) => {
    const hash = await Bun.password.hash(req.password, {
      algorithm: "bcrypt",
    });

    const registUser = await prisma.userModel.create({
      data: {
        username: req.username,
        password: hash,
        email: req.email,
      },
    });

    return registUser;
  };

  static authUser = async (req: UserAuth) => {
    const defaultExp = 2 * 4 * 60 * 60;
    const currentTime = new Date();
    const responseExpDate = new Date(currentTime.getTime() + defaultExp * 1000);

    const reqMatch = {
      username: req.username,
      email: req.email,
      role: req.roleId,
      exp: responseExpDate,
    };

    const secret = process.env.SECRET_JWT_KEY;

    const token = await sign(reqMatch, secret!, "HS256");

    const reqRes = { ...reqMatch, jwtToken: token };

    return reqRes;
  };

  static updateUser = async (id: number, req: User) => {
    const updatereqUser = await prisma.userModel.update({
      where: {
        id: id,
      },
      data: {
        username: req.username,
        email: req.email,
        password: req.password,
      },
    });

    return updatereqUser;
  };

  static deleteUser = async (idUser: number) => {
    const userDeleted = await prisma.userModel.delete({
      where: {
        id: idUser,
      },
    });

    return userDeleted;
  };
}

export default userService;
