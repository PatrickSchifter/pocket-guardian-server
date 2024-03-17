"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReceiptRepository {
    async getAllReceipts(chargeId) {
        const receipts = await prisma.receipt.findMany({
            where: {
                chargeId
            }
        });
        return receipts;
    }
    async getReceiptById(id) {
        const receipts = await prisma.receipt.findUnique({
            where: {
                id
            }
        });
        return receipts;
    }
    async create({ chargeId, amount, name, status, paid }) {
        const receipt = await prisma.receipt.create({
            data: {
                amount,
                name,
                status,
                chargeId,
                paid
            }
        });
        return receipt;
    }
    async updateUrl(url, id) {
        const receipt = await prisma.receipt.update({
            data: {
                url,
                status: 'Under analysis'
            },
            where: {
                id
            }
        });
        return receipt;
    }
    async paymentConfirmation(id) {
        const receipt = await prisma.receipt.update({
            data: {
                paid: true,
                status: 'Paid'
            },
            where: {
                id
            }
        });
        return receipt;
    }
}
exports.default = ReceiptRepository;
