import express from 'express';
import authRoutes from './authRoutes';
import expenseRoutes from './expenseRoutes';
// import receiptRoutes from './receiptRoutes'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/expense', expenseRoutes);
// router.use('/receipt', receiptRoutes);

export default router;
