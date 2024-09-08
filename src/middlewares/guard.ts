import jwt from "jsonwebtoken";
import { conflict } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      throw conflict("Invalid token");
    }
    (req as any).user = decoded;
    next();
  });
};

export default verifyToken;
