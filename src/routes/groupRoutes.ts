import express from 'express';
import { GroupController } from '../controllers/groupController';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const groupController = new GroupController()

router.get('/', jwtAuthMiddleware, (req: any, res) => groupController.getGroups(req, res));
router.delete('/', jwtAuthMiddleware, (req: any, res) => groupController.deleteGroup(req, res));
router.post('/', jwtAuthMiddleware, (req: any, res) => groupController.create(req, res));
router.post('/invite', jwtAuthMiddleware, (req: any, res) => groupController.invite(req, res));
router.get('/invite', jwtAuthMiddleware, (req: any, res) => groupController.getInvite(req, res));
router.post('/invite/response', jwtAuthMiddleware, (req: any, res) => groupController.inviteResponse(req, res));

export default router;
