"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class InviteRepository {
    async create({ email, groupId, invited_by, userId }) {
        const invite = await prisma.invite.create({
            data: {
                email,
                groupId,
                invited_by,
                userId: userId ? userId : undefined
            }
        });
        return invite;
    }
    async getInviteByUserId({ userId }) {
        const invites = await prisma.invite.findMany({
            where: {
                userId
            }
        });
        return invites;
    }
    async getInviteById({ id }) {
        const invites = await prisma.invite.findUnique({
            where: {
                id
            }
        });
        return invites;
    }
    async getInviteByEmailAndGroupId({ email, groupId }) {
        const invites = await prisma.invite.findFirst({
            where: {
                email,
                groupId
            }
        });
        return invites;
    }
    async updateReponse({ id, response }) {
        await prisma.invite.update({
            data: {
                response: response
            },
            where: {
                id
            }
        });
    }
    async deleteInviteById({ id }) {
        await prisma.invite.delete({
            where: {
                id
            }
        });
    }
    async deleteInviteByGrouId({ groupId }) {
        await prisma.invite.deleteMany({
            where: {
                groupId
            }
        });
    }
}
exports.InviteRepository = InviteRepository;
