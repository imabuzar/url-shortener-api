import { Request, Response } from 'express';
import Url, { IUrl } from '../models/url.model.js';
import { generateShortCode } from '../utils/generateShortCode.js';

export const createShortUrl = async (req: Request, res: Response) => {
  // Get originalUrl and generate shortCode
  const originalUrl: string = req.body.originalUrl;
  const shortCode = generateShortCode();

  try {
    const newUrl = new Url({ originalUrl, shortCode });
    const saved = await newUrl.save();

    // Current domain or base Url
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    // Short Url
    const shortUrl = `${baseUrl}/${saved.shortCode}`;

    return res.status(201).json({
      success: true,
      message: 'Short URL created successfully',
      data: {
        shortCode,
        originalUrl: saved.originalUrl,
        shortUrl,
        clicks: saved.clicks,
        createdAt: saved.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : err,
    });
  }
};

export const getShortUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const foundUrl: IUrl | null = await Url.findOne({ shortCode });

    if (!foundUrl) {
      return res.status(404).json({
        success: false,
        message: `Could not find url entry with shortCode '${shortCode}'`,
      });
    }

    // Current domain or base Url
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    // Short Url
    const shortUrl = `${baseUrl}/${foundUrl.shortCode}`;

    return res.status(200).json({
      success: true,
      message: 'URL data found successfully',
      data: {
        shortCode: foundUrl.shortCode,
        originalUrl: foundUrl.originalUrl,
        shortUrl: shortUrl,
        clicks: foundUrl.clicks,
        createdAt: foundUrl.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : err,
    });
  }
};

export const deleteShortUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const deleted: IUrl | null = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Could not find url entry with shortCode '${shortCode}'`,
      });
    }
    return res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : err,
    });
  }
};
