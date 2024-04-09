import express from 'express';
import { ExpenseController } from '../controllers/expenseController';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const expenseController = new ExpenseController()

router.post('/', jwtAuthMiddleware, (req: any, res) => expenseController.create(req, res));
router.get('/', jwtAuthMiddleware, (req, res) => expenseController.getAllExpenses(req, res));
router.put('/set-paid/:id', jwtAuthMiddleware, (req, res) => expenseController.setPaid(req, res));
router.delete('/:id', jwtAuthMiddleware, (req, res) => expenseController.delete(req, res));

export default router;
