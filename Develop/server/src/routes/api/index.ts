import { Router } from 'express';
const router = Router();

import cryptoRoutes from './crypto-routes.js';
// import newsRoutes from './news-routes.js';

router.use('/crypto', cryptoRoutes);
// router.use('/news', newsRoutes);

export default router;
