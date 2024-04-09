"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GroupUserRepository {
    async create({ groupId, userId }) {
        const groupUser = await prisma.groupUser.create({
            data: {
                groupId,
                userId
            }
        });
        return groupUser;
    }
    async getGroupUserById(id) {
        const groupUser = await prisma.groupUser.findUnique({
            where: {
                id
            }, include: {
                group: true
            }
        });
        return groupUser;
    }
    async getGroupUserByGroupId(groupId) {
        const groupUser = await prisma.groupUser.findMany({
            where: {
                groupId
            }
        });
        return groupUser;
    }
    async getGroupUserByGroupIdAndUserId({ groupId, userId }) {
        const groupUser = await prisma.groupUser.findFirst({
            where: {
                groupId,
                userId
            }
        });
        return groupUser;
    }
    async getGroupUserByUserId(userId) {
        const groupUser = await prisma.groupUser.findMany({
            where: {
                userId
            }, include: {
                group: true
            }
        });
        return groupUser;
    }
    async deleteGroupUserByUserIdAndGroupId({ userId, groupId }) {
        return await prisma.groupUser.deleteMany({
            where: {
                userId,
                groupId
            }
        });
    }
    async deleteGroupByGroupId({ groupId }) {
        return await prisma.groupUser.deleteMany({
            where: {
                groupId
            }
        });
    }
}
exports.GroupUserRepository = GroupUserRepository;
