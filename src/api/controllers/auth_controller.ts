// import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import status from "http-status";
// import { Role } from "@prisma/client";
// import { prisma } from "@services/db";
// import { notFound } from "@utils/resp";

import { prisma } from "@services/db";
import { Context } from "elysia";

// // interface UserRegisterReqBody {
// //   email: string;
// //   password: string;
// //   firstName: string;
// //   lastName: string;
// //   role: Role;
// //   phone: string;
// // }

// interface AdminLoginReqBody {
//   email: string;
//   password: string;
// }

// // interface CustomerLoginReqBody {
// //   email: string;
// //   password: string;
// // }

// // interface CustomerRegisterReqBody {
// //   email: string;
// //   password: string;
// //   firstName: string;
// //   lastName: string;
// // }

// // export const userLogin = async (
// //   req: Request<object, object, UserLoginReqBody>,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await prisma.users.findUnique({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     if (user) {
// //       if (bcryptjs.compareSync(password, user.password)) {
// //         const userInfo = {
// //           userId: user.id,
// //           email: user.email,
// //         };
// //         const token = jwt.sign(userInfo, `${process.env.USER_JWT_KEY}`, {
// //           expiresIn: "1d",
// //         });
// //         // delete user.password;
// //         return res.status(status.OK).json({ ...user, token: token });
// //       }
// //     }
// //     return res.status(status.UNAUTHORIZED).json(notFound("unauthorized"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const userRegister = async (
// //   req: Request<object, object, UserRegisterReqBody>,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { email, password, firstName, lastName, role, phone } = req.body;
// //     const encryptPassword = await bcryptjs.hash(password, 10);

// //     const user = await prisma.users.create({
// //       data: {
// //         email: email,
// //         password: encryptPassword,
// //         firstName: firstName,
// //         lastName: lastName,
// //         role: role,
// //         phone: phone,
// //       },
// //       select: {
// //         userId: true,
// //         email: true,
// //         password: false,
// //         firstName: true,
// //         lastName: true,
// //         role: true,
// //         phone: true,
// //       },
// //     });
// //     return res.status(status.OK).json(user);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const customerLogin = async (
// //   req: Request<object, object, CustomerLoginReqBody>,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   const { email, password } = req.body;
// //   try {
// //     const customer = await prisma.customer.findUnique({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     if (customer) {
// //       if (bcryptjs.compareSync(password, customer.password)) {
// //         const userInfo = {
// //           customerId: customer.customerId,
// //           email: customer.email,
// //           role: customer.role,
// //         };
// //         const token = jwt.sign(userInfo, process.env.USER_JWT_KEY, {
// //           expiresIn: "1d",
// //         });
// //         delete customer.password;
// //         return res.status(status.OK).json({ ...customer, token: token });
// //       }
// //     }
// //     return res.status(status.UNAUTHORIZED).json(notFound("unauthorized"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const customerRegister = async (
// //   req: Request<object, object, CustomerRegisterReqBody>,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const { email, password, firstName, lastName } = req.body;
// //     const encryptPassword = await bcryptjs.hash(password, 10);

// //     const user = await prisma.customer.create({
// //       data: {
// //         email: email,
// //         password: encryptPassword,
// //         firstName: firstName,
// //         lastName: lastName,
// //       },
// //       select: {
// //         customerId: true,
// //         email: true,
// //         password: false,
// //         firstName: true,
// //         lastName: true,
// //         role: true,
// //       },
// //     });
// //     return res.status(status.OK).json(user);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

export const adminLogin = async ({
  body,
  set,
}: {
  body: { email: string; password: string };
  set: Context["set"];
}) => {
  const { email, password } = body;
  try {
    const user = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      if (bcryptjs.compareSync(password, user.password)) {
        const userInfo = {
          userId: user.id,
          email: user.email,
        };

        const token = jwt.sign(userInfo, `${process.env.JWT_SECRET}`, {
          expiresIn: "1d",
        });
        // delete user.password;
        set.status = 200;
        return { ...user, token: token };
      }
    }
    set.status = 401;
    return { message: "unauthorized" };
  } catch (error) {
    console.log("error", error);
  }
};
