import { prisma } from "@services/db";
import { Context } from "elysia";
// interface UserCreateReqBody {
//   email: string
//   password: string
//   firstName: string
//   lastName: string
//   role: Role
//   phone: string
// }

// interface UserUpdateReqBody {
//   userId: string
//   email: string
//   password: string
//   firstName: string
//   lastName: string
//   role: Role
//   phone: string
// }
// interface User {
//   name: string;
//   age: number;
//   hi: Lang;
// }

interface Lang {
  th: "สวัสดี";
  en: "Hi";
}

export const getAllUser = async ({
  query,
  set,
}: {
  query: { skip: number; take: number };
  set: Context["set"];
}) => {
  try {
    const skip: number = query.skip;
    const take: number = query.take;

    const user = await prisma.users.findMany({
      skip: skip,
      take: take,

      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(user);
    set.status = 200;
    return user;
  } catch (error) {
    set.status = 400;
    return {
      error: "error",
    };
  }
};

// export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId: string = req.query.userId as string
//     const user = await prisma.user.findUnique({
//       where: {
//         userId: userId
//       }
//     })
//     if (!user) {
//       return res.status(status.NOT_FOUND).json(notFound("user not found"))
//     }
//     return res.status(status.OK).json(user)
//   } catch (error) {
//     next(error)
//   }
// }

// export const getUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId: string = req.query.userId as string
//     const user = await prisma.user.findUnique({
//       where: {
//         userId: userId
//       }
//     })
//     if (!user) {
//       return res.status(status.NOT_FOUND).json(notFound("user not found"))
//     }
//     return res.status(status.OK).json(user)
//   } catch (error) {
//     next(error)
//   }
// }

// export const createUser = async (
//   // req: Request<object, object, UserCreateReqBody>,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // const { email, password, firstName, lastName, role, phone } = req.body;
//     const encryptPassword = await bcryptjs.hash("peach1234", 10);

//     const user = await prisma.users.create({
//       data: {
//         name: "peachvon3",
//         email: "678@ads.com",
//         password: encryptPassword,
//       },
//     });
//     return res.status(status.OK).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUser = async (
//   req: Request<object, object, UserUpdateReqBody>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId, email, password, firstName, lastName, role, phone } = req.body
//     const encryptPassword = await bcryptjs.hash(password, 10)

//     const user = await prisma.user.update({
//       where: {
//         userId: userId
//       },
//       data: {
//         email: email,
//         password: encryptPassword,
//         firstName: firstName,
//         lastName: lastName,
//         role: role,
//         phone: phone
//       }
//     })
//     return res.status(status.OK).json(user)
//   } catch (error) {
//     next(error)
//   }
// }

// export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { userId } = req.body
//     const user = await prisma.user.delete({
//       where: {
//         userId: userId
//       }
//     })
//     return res.status(status.OK).send(user)
//   } catch (error) {
//     next(error)
//   }
// }

// export const getUserByEmail = async (email: string) => {
//   try {
//     return await prisma.user.findUnique({
//       where: {
//         email: email
//       }
//     })
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const getUserWithoutPassword = async (userId: string) => {
//   try {
//     return await prisma.user.findUnique({
//       where: {
//         userId: userId
//       },
//       select: {
//         userId: true,
//         email: true,
//         role: true
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
