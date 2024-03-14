import { PrismaClient } from '@prisma/client';
import { Charge, ChargeCreate } from '../interfaces/ChargeInterface';
const prisma = new PrismaClient();

class ChargeRepository {
    async getAllCharges(id: number) {
        const charges = await prisma.charge.findMany({
            where:{
                adminId: id
            }
        });
        return charges;
    }

    async create({adminId, description}: ChargeCreate): Promise<Charge> {
        const charge = await prisma.charge.create({
            data:{
                description,
                adminId
            }
        });
        return charge;
    }

    async getChargeById(id: number) {
        const charge = await prisma.charge.findUnique({
            where:{
                id: id
            }
        });
        return charge;
    }

}

export default ChargeRepository;
