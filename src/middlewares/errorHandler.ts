import { NextFunction, Request, Response } from "express";
import { HttpStatusEnum } from "../enums/index";
import buildError from "./buildError";

/**
 * Error response middleware for 404 not found.
 */
export function notFound(req: Request, res: Response) {
  res.status(HttpStatusEnum.NOT_FOUND).json({
    success: false,
    code: HttpStatusEnum.NOT_FOUND,
    message: "Page Not Found",
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 */
export function methodNotAllowed(req: Request, res: Response) {
  res.status(HttpStatusEnum.METHOD_NOT_ALLOWED).json({
    success: false,
    code: HttpStatusEnum.METHOD_NOT_ALLOWED,
    message: "Method Not Allowed",
  });
}

export function genericErrorHandler(err: any, req: Request, res: Response, _: NextFunction) {
  const error = buildError(err);
  res.status(error.code).json({ ...error });
}
