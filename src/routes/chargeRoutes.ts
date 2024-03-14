import express from 'express';
import { ChargeController } from '../controllers/chargeController';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { RequestUserId } from '../interfaces/RequestInterface';

const router = express.Router();
const chargeControrller = new ChargeController()

router.post('/',jwtAuthMiddleware, (req: any, res) => chargeControrller.create(req, res));
router.get('/:id', (req, res) => chargeControrller.getAllCharges(req, res));

export default router;
