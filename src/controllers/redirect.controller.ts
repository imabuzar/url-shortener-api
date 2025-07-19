import { Request, Response } from 'express';
import Url, { IUrl } from '../models/url.model.js';

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const updatedUrl: IUrl | null = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { 'clicks.total': 1 }, $push: { 'clicks.timestamps': new Date() } },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).send('404 Not Found');
    }

    return res.redirect(302, updatedUrl.originalUrl);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : err,
    });
  }
};
