"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const expenseRoutes_1 = __importDefault(require("./expenseRoutes"));
const groupRoutes_1 = __importDefault(require("./groupRoutes"));
const router = express_1.default.Router();
router.use('/auth', authRoutes_1.default);
router.use('/expense', expenseRoutes_1.default);
router.use('/group', groupRoutes_1.default);
exports.default = router;
