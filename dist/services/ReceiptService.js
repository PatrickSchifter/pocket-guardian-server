"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptService = void 0;
const ReceiptRepository_1 = __importDefault(require("../repository/ReceiptRepository"));
const ExpenseRepository_1 = __importDefault(require("../repository/ExpenseRepository"));
class ReceiptService {
    receiptRepository;
    chargeRepository;
    constructor() {
        this.receiptRepository = new ReceiptRepository_1.default();
        this.chargeRepository = new ExpenseRepository_1.default();
    }
    async create({ amount, chargeId, name, status, url }) {
        const receipt = await this.receiptRepository.create({ amount, chargeId, name, status, url });
        return receipt;
    }
    async getAllReceipts(chargeId) {
        const receipts = await this.receiptRepository.getAllReceipts(chargeId);
        return receipts;
    }
    async paymentConfirmation(id, adminId) {
        const receipt = await this.receiptRepository.getReceiptById(id);
        if (!receipt) {
            throw new Error('Receipt not found');
        }
        ;
        const charge = await this.chargeRepository.getChargeById(receipt.chargeId);
        if (!charge) {
            throw new Error('Charge not found');
        }
        ;
        if (charge.adminId !== adminId) {
            throw new Error('It must be admin to confirm payment');
        }
        const payment = await this.receiptRepository.paymentConfirmation(id);
        return payment;
    }
    async updateUrl(url, id) {
        const receiptExists = await this.receiptRepository.getReceiptById(id);
        if (!receiptExists) {
            throw new Error('Receipt not found.');
        }
        const receipt = await this.receiptRepository.updateUrl(url, id);
        return receipt;
    }
}
exports.ReceiptService = ReceiptService;
