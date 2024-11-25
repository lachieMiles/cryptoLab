import { Router } from 'express';
import cryptoRoutes from './crypto-routes.js';
import newsRoutes from './news-routes.js';

const router = Router();

router.use('/crypto', cryptoRoutes);
router.use('/news', newsRoutes);

export default router;
