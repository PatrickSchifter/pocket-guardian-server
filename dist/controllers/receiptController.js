"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptController = void 0;
const ReceiptService_1 = require("../services/ReceiptService");
class ReceiptController {
    receiptService;
    constructor() {
        this.receiptService = new ReceiptService_1.ReceiptService();
    }
    async create(req, res) {
        const { amount, chargeId, name, status } = req.body;
        try {
            const receipt = await this.receiptService.create({ amount, chargeId, name, status, url: null });
            res.send(receipt);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async getAllReceipts(req, res) {
        const { chargeId } = req.params;
        try {
            const receipts = await this.receiptService.getAllReceipts(parseInt(chargeId));
            res.send(receipts);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async paymentConfirmation(req, res) {
        const { id } = req.body;
        const adminId = req.userId;
        try {
            if (!adminId) {
                throw new Error('User not provided');
            }
            const receipt = await this.receiptService.paymentConfirmation(id, adminId);
            res.send(receipt);
        }
        catch (error) {
            if (error.message === "It must be admin to confirm payment") {
                res.status(403).send({ error: error.message });
            }
            else {
                res.status(500).send(error.message);
            }
        }
    }
    async updateUrl(req, res) {
        const { url, id } = req.body;
        try {
            const receipt = await this.receiptService.updateUrl(url, id);
            res.send(receipt);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}
exports.ReceiptController = ReceiptController;
;
