import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface FastifyRequestUserId extends Request {
  userId?: string;
}

const verifyJWT = async (req: FastifyRequestUserId, reply: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      reply.status(401).send({ message: 'Token not found.' });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, process.env.SECRET_JWT || '');
    req.userId = decoded.data.iduser;
    next();
  } catch (err) {
    reply.status(401).send({ message: 'Invalid token' });
  }
};

export const jwtAuthMiddleware = async (
  req: Request,
  reply: Response,
  next: NextFunction
) => {
  try {
    await verifyJWT(req, reply, next);
  } catch (err) {
    reply.status(500).send({ message: 'Internal Server Error' });
  }
};
