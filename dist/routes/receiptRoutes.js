"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receiptController_1 = require("../controllers/receiptController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const receiptController = new receiptController_1.ReceiptController();
router.post('/', auth_middleware_1.jwtAuthMiddleware, (req, res) => receiptController.create(req, res));
router.get('/:chargeId', auth_middleware_1.jwtAuthMiddleware, (req, res) => receiptController.getAllReceipts(req, res));
router.post('/payment-confirmation', auth_middleware_1.jwtAuthMiddleware, (req, res) => receiptController.paymentConfirmation(req, res));
router.post('/update-url', auth_middleware_1.jwtAuthMiddleware, (req, res) => receiptController.updateUrl(req, res));
exports.default = router;
