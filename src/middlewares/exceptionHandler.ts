import { NextFunction, Request, Response } from "express";

type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const exceptionHandler = (fn: AsyncMiddleware) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));

export { exceptionHandler };
