import { Response, Request, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

interface PayLoad{
  sub: string;

}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){

  // Receber o token
  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
  // Validar o token
  const { sub } = verify(
    token,
    process.env.JWT_SECRET
  ) as PayLoad;

  return next();

  }catch(err) {
    return res.status(401).end();
  }
}