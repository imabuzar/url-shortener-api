import express from 'express';
import { createShortUrl, getShortUrl, deleteShortUrl } from '../controllers/url.controller.js';
import { validateRequestBody } from '../middlewares/validateRequestBody.middleware.js';

// Routes at /api/urls
const router = express.Router();

// Create a short URL
router.post('/', validateRequestBody, createShortUrl);
// Get a short URL with shortCode
router.get('/:shortCode', getShortUrl);
// Delete a short URL
router.delete('/:shortCode', deleteShortUrl);

export default router;
