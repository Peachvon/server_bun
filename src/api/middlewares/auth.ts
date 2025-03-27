import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt from "jsonwebtoken";
import { errAuth } from "@utils/resp";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token || Array.isArray(token)) {
    return res.status(status.NOT_FOUND).json(errAuth("token not found"));
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, `${process.env.USER_JWT_KEY}`);
    req.body.userPayload = decoded;
    console.log("userPayload", decoded);
    next();
  } catch (error) {
    next(error);
  }
};

export const authorized = (roleCheck: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roleCheck.indexOf(req.body.user.Role) > -1) {
      next();
    } else {
      res.status(status.FORBIDDEN).json(errAuth("forbidden"));
    }
  };
};
