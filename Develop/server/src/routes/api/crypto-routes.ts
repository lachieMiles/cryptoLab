import { Router, type Request, type Response } from 'express';
const router = Router();

import cryptoService from '../../service/cryptoService.js';

// GET route => also implementing pagination so we only load the first 10 crypto's
router.get('/', async (_req: Request, res: Response) => {
  console.log('GET /api/crypto route hit');
  try {
    const start = Number(_req.query.start) || 1;
    const limit = Number(_req.query.limit) || 10;

    const cryptoData = await cryptoService.getCryptos(start, limit);
    res.json(cryptoData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
