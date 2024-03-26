"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const password_1 = require("../utils/password");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
    async findByEmail(email) {
        const users = await prisma.user.findFirst({
            where: {
                email
            }
        });
        return users;
    }
    async findById(id) {
        const users = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return users;
    }
    async createUser(name, email, password) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await (0, password_1.encryptPassword)(password)
            }
        });
        return user;
    }
    async confirmEmail(id) {
        return await prisma.user.update({
            data: {
                confirmed: true
            },
            where: {
                id
            }
        });
    }
}
exports.default = UserRepository;
