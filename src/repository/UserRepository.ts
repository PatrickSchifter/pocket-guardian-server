import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../utils/password';

const prisma = new PrismaClient();

class UserRepository {
    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }

    async findByEmail(email: string) {
        const users = await prisma.user.findFirst({
            where:{
                email
            }
        });
        return users;
    }

    async createUser(name: string, email: string, password: string) {
        const user = await prisma.user.create({
            data: {
            name,
            email,
            password: await encryptPassword(password)
            }
        });
        return user;
    }

    async confirmEmail(id:number){
        await prisma.user.update({
            data:{
                confirmed: true
            },
            where:{
                id
            }
        })
    }
}

export default UserRepository;
