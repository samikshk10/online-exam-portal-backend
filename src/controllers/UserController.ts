import User from "../models/user";
import bcrypt from "bcrypt";
import cryptoJs from "crypto-js";
import generator from "generate-password";
import { conflict, notFound } from "@hapi/boom";
import { RouterClass } from "@src/classes";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";
import { AdminCredentials, CryptoSecretKey } from "../config";

export class UserController {
  public constructor() { }

  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.findAll({
        where: { role: "USER" },
        order: [["createdAt", "DESC"]],
      });

      console.log("Queried users:", users); // Debugging output

      if (users.length === 0) {
        res.status(200).json({ message: "No Users found" });
      } else {
        res.status(200).json({ data: users, message: "Users fetched successfully" });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async addAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const isUserExisted = await User.findOne({ where: { email } });
      if (isUserExisted) {
        throw conflict("Email already exists!");
      }
      const userData = {
        email,
        password,
        role: "ADMIN",
      };
      const createdUser = await User.create(userData);
      if (createdUser) res.status(200).json({ data: createdUser, message: "Admin added successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async LoginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      let firstLoginAdmin: boolean = false;



      // Check if there's an admin in the database
      const userAdmin = await User.findOne({ where: { role: "ADMIN" } });
      if (!userAdmin) {
        if (email === AdminCredentials.email && password === AdminCredentials.password) {
          firstLoginAdmin = true;
        } else {
          throw conflict("Invalid Credentials");
        }
      }

      // Check if the user exists in the database
      const user = await User.findOne({ where: { email } });
      if (!firstLoginAdmin) {
        if (!user) {
          throw notFound("User not found");
        }


        const decrypted = cryptoJs.AES.decrypt(password, CryptoSecretKey.secret).toString(cryptoJs.enc.Utf8);

        if (!decrypted) {
          throw conflict("Password Decryption failed");
        }
        const passwordMatches = await bcrypt.compare(decrypted, user.password);
        if (!passwordMatches) {
          throw conflict("Invalid Credentials");
        }

        if (user.role !== "ADMIN") {
          throw conflict("The user is not authorized");
        }

        if (user.status !== "ACTIVE") {
          throw conflict("Admin is not active");
        }
      }

      // Create payload for JWT
      let payload;
      if (firstLoginAdmin) {
        payload = {
          email: AdminCredentials.email,
          role: "ADMIN",
          fullName: "Admin",
        };
      } else {
        payload = {
          email: user?.email,
          role: user?.role,
          fullName: user?.fullName,
        };
      }

      // Sign JWT with payload
      const token = await sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
      console.log(token);

      // Send response
      res.status(200).json({ data: { token, payload }, message: "Admin logged in successfully" });
    } catch (error) {
      console.log(error, "error>>>>>>>>>>>>>>>");
      next(error);
    }
  }

  public static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, fullName } = req.body;
      const isUserExisted = await User.findOne({ where: { email } });
      if (isUserExisted) {
        throw conflict("Email already exists!");
      }

      await bcrypt.hash(password, 10, async (err: any, hashedPassword: any) => {
        if (err) {
          throw err;
        }

        const userData = {
          fullName,
          email,
          password: hashedPassword,
          role: "ADMIN",
        };

        const createdUser = await User.create(userData);
        if (createdUser) {
          res.status(200).json({ data: createdUser, message: "Admin added successfully" });
        }

      });

    }
    catch (error: any) {
      next(error);
    }
  }


  public static async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = (req as any).user;
      console.log("asdfadfasdfasdfasdfhere>>>");
      res.status(200).json({ data: userData, message: "User verified successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async toggleUserStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      const userData = await User.findOne({ where: { id } });
      if (!userData) {
        throw conflict("User not found");
      }
      const userUpdated = await userData?.update({ status: userData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" });

      if (userUpdated) {
        res.status(200).json({
          data: userUpdated,
          message: "User status updated successfully",
        });
      } else {
        throw conflict("User updated failed");
      }
    } catch (error) {
      next(error);
    }
  }

  public static async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email } = req.body;
      console.log(fullName, email);

      const isUserExisted = await User.findOne({ where: { email } });

      if (isUserExisted) {
        throw conflict("User already exists!");
      }
      const userData = {
        fullName,
        email,
      };
      const createdUser = await User.create(userData);
      if (createdUser) res.status(200).json({ data: createdUser, message: "User added successfull" });
    } catch (error) {
      console.log(error, "user error add >>>>>>>");
      next(error);
    }
  }

  public static async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchText, status } = req.body;
      console.log("this is search text", searchText);

      const isUserExisted = await User.findAll({
        where: {
          [Op.or]: [{ fullName: { [Op.like]: `%${searchText}%` } }, { email: { [Op.like]: `%${searchText}%` } }],
          role: "USER",
        },
      });
      console.log("this is user", isUserExisted);
      if (isUserExisted.length === 0) {
        res.status(200).json({ message: "No Users found" });
      } else {
        res.status(200).json({ data: isUserExisted, message: "Users fetched successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
}
