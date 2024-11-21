import { Router, type Request, type Response } from 'express';
const router = Router();

import newsService from '../../service/newsService.js';

// GET route => fetching most recent data!
router.get('/', async (_req: Request, res: Response) => {
  console.log('GET/api/news route hit');
  try {
    const article = await newsService.getLatestArticle();
    res.json(article);
  } catch (err) {
    console.error('Error fetching news article:', err);
    res.status(500).json({ error: 'Failed to fetch news articles!' });
  }
});

export default router;
