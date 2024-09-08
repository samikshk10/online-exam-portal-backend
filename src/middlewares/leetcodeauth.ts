import Boom from "@hapi/boom";
import Leetcode, { EndPoint } from "leetcode-api-typescript";
import { AuthenticatedRequest } from "@src/interfaces";
import { NextFunction, Request, Response } from "express";

export async function leetCodeAuthCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await Leetcode.build(EndPoint.US, {
      cookie: process.env.LEETCODE_COOKIE,
    });
    console.log("response :", response);

    (req as unknown as AuthenticatedRequest).leetcode = response;
    next();
  } catch (error) {
    console.log(error, "errororoor");
    throw Boom.unauthorized("Auth Failed Leetcode", "", {
      message: "AUTH FAILED",
    });
  }
}
