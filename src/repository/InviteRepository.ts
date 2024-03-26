import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { InviteCreate, Invite } from '../interfaces/InviteInterface';

export class InviteRepository{
    async create({ email, groupId, invited_by, userId}: InviteCreate): Promise<Invite> {
        const invite = await prisma.invite.create({
            data:{
                email,
                groupId,
                invited_by,
                userId: userId ? userId : undefined
            }
        });
        return invite;
    }

    async getInviteByUserId({userId}: {userId: string}): Promise<Invite[]> {
        const invites = await prisma.invite.findMany({
            where:{
                userId
            }
        });
        return invites;
    }

    async getInviteById({id}: {id: string}): Promise<Invite | null> {
        const invites = await prisma.invite.findUnique({
            where:{
                id
            }
        });
        return invites;
    }

    async getInviteByEmailAndGroupId({email, groupId}: {email: string, groupId: string}): Promise<Invite | null> {
        const invites = await prisma.invite.findFirst({
            where:{
                email,
                groupId
            }
        });
        return invites;
    }

    async updateReponse({id, response}: {id: string, response: boolean}){
        await prisma.invite.update({
            data:{
                response: response
            },
            where: {
                id
            }
        })
    }

    async deleteInviteById({id}: {id: string}) {
        await prisma.invite.delete({
            where: {
                id
            }
        })
    }
}