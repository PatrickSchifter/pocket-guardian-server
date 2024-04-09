"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GroupRepository {
    async create({ adminId, name }) {
        const expense = await prisma.group.create({
            data: {
                name,
                adminId
            }
        });
        return expense;
    }
    async getGroupById(id) {
        const group = await prisma.group.findUnique({
            where: {
                id
            }, include: {
                expenses: true
            }
        });
        return group;
    }
    async getGroupByAdminIdAndName(adminId, name) {
        const group = await prisma.group.findFirst({
            where: {
                adminId,
                name
            }
        });
        return group;
    }
    async getGroupExpenseByUserId({ userId }) {
        const expense = await prisma.group.findMany({
            where: {
                groupUser: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                expenses: true,
            },
        });
        return expense;
    }
    async deleteGroupById({ id }) {
        await prisma.group.delete({
            where: {
                id
            }
        });
    }
}
exports.GroupRepository = GroupRepository;
