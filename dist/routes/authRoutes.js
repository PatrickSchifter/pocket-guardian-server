"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
const authController = new authController_1.default();
router.post('/register', (req, res) => authController.register(req, res));
router.get('/confirm-email/:id', (req, res) => authController.confirmEmail(req, res));
router.post('/login', (req, res) => authController.login(req, res));
exports.default = router;
