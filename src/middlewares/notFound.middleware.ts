import { Request, Response, NextFunction } from 'express';

export const handleNotFound = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json({ success: false, message: '404 Route Not Found' });
};
