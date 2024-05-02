import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import userService from "../service/userService";
import { userValidate } from "../validator/schemaValidator";
import { userSchemaZod } from "../validator/initiateValidate";

class userHandler {
  static userFindById = async (c: Context) => {
    try {
      const userID = c.req.param("id");
      const parseUserID = parseInt(userID, 10);

      console.log(userID);

      if (isNaN(parseUserID)) {
        return c.json({ status: 400, message: "Incorrect Id Input !" }, 400);
      }

      const data = await userService.userFindById(parseUserID);

      if (!data) {
        return c.json(
          {
            status: 404,
            message: `Data Dengan ID ${parseUserID} Tidak Ditemukan pada database !`,
          },
          404
        );
      }

      return c.json(
        {
          status: 200,
          message: `Data Berhasil Diambil !`,
          dataUser: data,
        },
        200
      );
    } catch (e) {
      throw new HTTPException(500, {
        message: `Error 500 Caused By : ${e}`,
      });
    }
  };

  static regsiterUser = async (c: Context) => {
    try {
      const dataInput: User = await c.req.json();

      const validator = userValidate.validate(userSchemaZod.user, dataInput);

      if (!validator) {
        return c.json(
          { status: 400, message: "validator error !", validator },
          400
        );
      }

      const isEmailExist = await userService.findUserByEmail(dataInput.email);

      if (isEmailExist) {
        return c.json(
          {
            status: 400,
            message: "Nama Atau Email Sudah Digunakan !",
          },
          400
        );
      }

      const dataRegsiter = await userService.registerUser(dataInput);

      return c.json(
        {
          status: 200,
          message: `Berhasil Membuat Akun !`,
          dataRegsiter,
        },
        200
      );
    } catch (e) {
      throw new HTTPException(500, { message: `Error 500 Caused By : ${e}` });
    }
  };

  static updateUser = async (c: Context) => {
    try {
      const idUser = c.req.param("id");
      const dataUpdate: User = await c.req.json();
      const parsedIdParam = parseInt(idUser);

      console.log(parsedIdParam);
      console.log(dataUpdate);

      if (isNaN(parsedIdParam)) {
        return c.json({ status: 400, message: "Incorrect Id Input" }, 400);
      }

      const validator = userValidate.validate(
        userSchemaZod.userUpdate,
        dataUpdate
      );

      if (!validator) {
        return c.json(
          { status: 400, message: "validator error !", validator },
          400
        );
      }

      const isIdExist = await userService.userFindById(parsedIdParam);

      if (!isIdExist) {
        return c.json(
          {
            status: 404,
            message: `Data dengan ID ${parsedIdParam} tidak ditemukan !`,
          },
          404
        );
      }

      const updateData = await userService.updateUser(
        parsedIdParam,
        dataUpdate
      );

      return c.json(
        { status: 200, message: "Berhasil Update", updateData },
        200
      );
    } catch (e) {
      throw new HTTPException(500, { message: `Error 500 Caused By : ${e}` });
    }
  };

  static deleteUser = async (c: Context) => {
    try {
      const idUser = c.req.param("id");
      const parsedIdUser = parseInt(idUser);

      const dataId = await userService.userFindById(parsedIdUser);

      if (!dataId) {
        return c.json(
          {
            status: 404,
            message: `Data User Dengan ID ${parsedIdUser} Tidak Ditemukan !`,
          },
          404
        );
      }

      const deletedData = await userService.deleteUser(parsedIdUser);

      return c.json(
        {
          status: 200,
          message: `Berhasil Menghapus User Dengan ID: ${parsedIdUser} `,
          deletedData,
        },
        200
      );
    } catch (e) {
      throw new HTTPException(500, { message: `Error 500 Caused By : ${e}` });
    }
  };

  static authUser = async (c: Context) => {
    try {
      const data: UserAuth = await c.req.json();

      const emailFind = await userService.findUserByEmail(data.email);

      if (!emailFind) {
        return c.json(
          {
            status: 404,
            message: `User dengan Email ${data.email} Tidak Ditemukan !`,
          },
          404
        );
      }

      const comparePass = await Bun.password.verify(
        data.password,
        emailFind.password,
        "bcrypt"
      );

      if (!comparePass) {
        return c.json({ message: "Password Salah !" }, 501);
      }

      const dataPush = {
        ...data,
        username: emailFind.username,
        roleId: emailFind.roleId,
      };
      const authService = await userService.authUser(dataPush);

      return c.json({ status: 200, message: "Berhasil !", authService }, 200);
    } catch (e) {
      throw new HTTPException(500, { message: `Error 500 Caused By : ${e}` });
    }
  };
}

export default userHandler;
