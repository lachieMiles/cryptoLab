import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

export default router;
