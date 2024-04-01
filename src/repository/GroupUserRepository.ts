import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { GroupUser, GroupUserCreate } from '../interfaces/GroupUserInterface';

export class GroupUserRepository {
    async create ({groupId, userId}: GroupUserCreate): Promise<GroupUser | null> {
        const groupUser = await prisma.groupUser.create({
            data: {
                groupId,
                userId
            }
        });
        return groupUser;
    }

    async getGroupUserById(id: string): Promise<GroupUser | null> {
        const groupUser = await prisma.groupUser.findUnique({
            where: {
                id
            }, include:{
                group: true
            }
        });

        return groupUser;
    }

    async getGroupUserByGroupId(groupId: string): Promise<GroupUser[] | null> {
        const groupUser = await prisma.groupUser.findMany({
            where: {
                groupId
            }
        });

        return groupUser;
    }

    async getGroupUserByGroupIdAndUserId({groupId, userId}:{groupId: string, userId: string}): Promise<GroupUser | null> {
        const groupUser = await prisma.groupUser.findFirst({
            where: {
                groupId,
                userId
            }
        });

        return groupUser;
    }

    async getGroupUserByUserId(userId: string): Promise<GroupUser[] | null> {
        const groupUser = await prisma.groupUser.findMany({
            where: {
                userId
            }, include:{
                group: true
            }
        });

        return groupUser;
    }

    async deleteGroupUserByUserIdAndGroupId({userId, groupId}: {userId: string; groupId: string}) {
        return await prisma.groupUser.deleteMany({
            where: {
                userId,
                groupId
            }
        })
    }

    async deleteGroupByGroupId({groupId}: {groupId: string}){
        return await prisma.groupUser.deleteMany({
            where:{
                groupId
            }
        })
    }
}