import express from 'express';
import authRoutes from './authRoutes';
import chargeRoutes from './chargeRoutes';
import receiptRoutes from './receiptRoutes'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/charge', chargeRoutes);
router.use('/receipt', receiptRoutes);

export default router;
