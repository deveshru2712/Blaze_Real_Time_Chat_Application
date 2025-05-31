import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

const inputValidator =
  (schema: z.ZodSchema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default inputValidator;
