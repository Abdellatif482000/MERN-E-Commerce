import jwt, { decode } from "jsonwebtoken";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "4222c50395efa991b684a84c7710955b36a52dd2a9f3f410f1cbb809f777dfa0";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];

  // const token = authHeader.split("")[1];
  if (!token) {
    res.status(401).json("notoken");
  }

  try {
    jwt.verify(token, JWT_SECRET, (err: any, user: string) => {
      // if (err) return res.send(err);

      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);

    return res.status(401).send("notoken");
  }
};
