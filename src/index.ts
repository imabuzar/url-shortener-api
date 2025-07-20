import express from 'express';
import urlRoutes from './routes/url.routes.js';
import { rootHandler } from './controllers/root.controller.js';
import { redirectToOriginalUrl } from './controllers/redirect.controller.js';
import mongoose from 'mongoose';
import { handleNotFound } from './middlewares/notFound.middleware.js';

const app = express();
const PORT = (process.env.PORT || 3000) as number;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/url_shortener';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('MongoDB connection error!', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/urls', urlRoutes);
app.get('/', rootHandler);
app.get('/:shortCode', redirectToOriginalUrl);

// 404 Not Found Middleware
app.use(handleNotFound);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
