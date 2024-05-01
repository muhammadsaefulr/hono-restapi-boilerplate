import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { ResponseError } from "../errorHandle/responseError";

const prisma = new PrismaClient();

class userService {
  static userFindById = async (userId: number) => {
    const data = await prisma.userModel.findUnique({
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

    return data;
  };

  static findUserByEmail = async (email: string) => {
    const data = await prisma.userModel.findUnique({
      where: {
        email: email,
      },
    });

    return data;
  };

  static findUserByUsername = async (name: string) => {
    const data = await prisma.userModel.findMany({
      where: {
        username: name,
      },
    });

    return data;
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

    const dataRes = {
      username: req.username,
      email: req.email,
    };

    return dataRes;
  };

  static updateUser = async (id: number, req: User) => {
    const updateDataUser = await prisma.userModel.update({
      where: {
        id: id,
      },
      data: {
        username: req.username,
        email: req.email,
        password: req.password,
      },
    });

    return updateDataUser;
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
