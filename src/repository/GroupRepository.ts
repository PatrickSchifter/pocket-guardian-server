import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { Group, GroupCreate } from '../interfaces/GroupInterface';

export class GroupRepository{
    async create({ adminId, name}: GroupCreate): Promise<Group> {
        const expense = await prisma.group.create({
            data:{
                name,
                adminId
            }
        });
        return expense;
    }

    async getGroupById(id: string): Promise<Group | null> {
        const group = await prisma.group.findUnique({
            where:{
                id
            }, include: {
                expenses: true
            }
        })
        return group;
    }

    async getGroupByAdminIdAndName(adminId: string, name: string): Promise<Group | null> {
        const group = await prisma.group.findFirst({
            where:{
                adminId,
                name
            }
        })
        return group;
    }

    async getGroupExpenseByUserId({userId}: {userId: string}) {
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
}