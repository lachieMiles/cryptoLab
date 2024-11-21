import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import validateToken from '../middleware/auth.js';
const router = Router();

router.use('/auth', authRoutes)
router.use('/api', apiRoutes);
router.use('api', validateToken, apiRoutes);
export default router;
