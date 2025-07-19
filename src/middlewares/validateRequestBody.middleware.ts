import { Request, Response, NextFunction } from 'express';
import { validateUrl } from '../utils/validators.js';

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.body.originalUrl) {
    return res
      .status(400)
      .json({ success: false, message: 'originalUrl is required in request body' });
  }

  const originalUrl: string = req.body.originalUrl;
  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ success: false, message: 'originalUrl must be a valid url' });
  }

  next();
};
