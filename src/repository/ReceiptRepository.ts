import { PrismaClient } from '@prisma/client';
import { ReceiptCreate, Receipt } from '../interfaces/ReceiptInterface';
const prisma = new PrismaClient();

class ReceiptRepository {
    async getAllReceipts(chargeId: number): Promise<Receipt[]> {
        const receipts = await prisma.receipt.findMany({
            where:{
                chargeId
            }
        });
        return receipts;
    }

    async getReceiptById(id: number): Promise<Receipt | null> {
        const receipts = await prisma.receipt.findUnique({
            where:{
                id
            }
        });
        return receipts;
    }

    async create({chargeId, amount, name, status, paid}: ReceiptCreate): Promise<Receipt | null>{
        const receipt = await prisma.receipt.create({
            data:{
                amount,
                name,
                status,
                chargeId,
                paid
            }
        });
        return receipt;
    }

    async updateUrl(url: string, id: number): Promise<Receipt | null>{
        const receipt = await prisma.receipt.update({
            data:{
                url,
                status: 'Under analysis'
            },
            where:{
                id
            }
        });
        return receipt;
    }

    async paymentConfirmation(id: number): Promise<Receipt | null>{
        const receipt = await prisma.receipt.update({
            data:{
                paid: true,
                status: 'Paid'
            },
            where:{
                id
            }
        });
        return receipt;
    }
}

export default ReceiptRepository;
