import { Request, Response } from 'express';

export const rootHandler = (_req: Request, res: Response) => {
  return res.status(200).send('URL Shortener API server is running...');
};
