import express from 'express';
import { ReceiptController } from '../controllers/receiptController';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const receiptController = new ReceiptController()

router.post('/',jwtAuthMiddleware, (req, res) => receiptController.create(req, res));
router.get('/:chargeId',jwtAuthMiddleware, (req, res) => receiptController.getAllReceipts(req, res));
router.post('/payment-confirmation',jwtAuthMiddleware, (req, res) => receiptController.paymentConfirmation(req, res));
router.post('/update-url',jwtAuthMiddleware, (req, res) => receiptController.updateUrl(req, res));

export default router;
