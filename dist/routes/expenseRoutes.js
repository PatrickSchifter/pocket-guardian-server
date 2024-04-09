"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const expenseController = new expenseController_1.ExpenseController();
router.post('/', auth_middleware_1.jwtAuthMiddleware, (req, res) => expenseController.create(req, res));
router.get('/', auth_middleware_1.jwtAuthMiddleware, (req, res) => expenseController.getAllExpenses(req, res));
router.put('/set-paid/:id', auth_middleware_1.jwtAuthMiddleware, (req, res) => expenseController.setPaid(req, res));
router.delete('/:id', auth_middleware_1.jwtAuthMiddleware, (req, res) => expenseController.delete(req, res));
exports.default = router;
