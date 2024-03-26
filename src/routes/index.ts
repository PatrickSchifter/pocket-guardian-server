import express from 'express';
import authRoutes from './authRoutes';
import expenseRoutes from './expenseRoutes';
import groupRoutes from './groupRoutes'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/expense', expenseRoutes);
router.use('/group', groupRoutes);

export default router;
