"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupController_1 = require("../controllers/groupController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const groupController = new groupController_1.GroupController();
router.get('/', auth_middleware_1.jwtAuthMiddleware, (req, res) => groupController.getGroups(req, res));
router.post('/', auth_middleware_1.jwtAuthMiddleware, (req, res) => groupController.create(req, res));
router.post('/invite', auth_middleware_1.jwtAuthMiddleware, (req, res) => groupController.invite(req, res));
router.post('/invite/response', auth_middleware_1.jwtAuthMiddleware, (req, res) => groupController.inviteResponse(req, res));
exports.default = router;
