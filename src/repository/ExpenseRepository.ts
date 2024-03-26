import { PrismaClient } from '@prisma/client';
import { Expense, ExpenseCreate } from '../interfaces/ExpenseInterface';
const prisma = new PrismaClient();

interface GetExpense{
    userId: string; 
    initialDay: Date; 
    finalDay: Date; 
    type?: string; 
    status?: string;
    groupId: string
}

export class ExpenseRepository {
    async getAllExpenses(
        {
            userId, 
            initialDay, 
            finalDay, 
            type, 
            status,
            groupId
        }: GetExpense
    ) {
        let expenses;
        let sum;
        let sumIncome;
        let sumOutcome;

        if (type && status ){
            expenses = await this.getAllExpensesByTypeAndStatus({
                userId, 
                type, 
                initialDay, 
                finalDay, 
                status,
                groupId
            });
            sum = await this.getSumExpensesByTypeAndStatus({
                userId, 
                type, 
                initialDay, 
                finalDay, 
                status, 
                groupId
            });
        }else if(type){
            expenses = await this.getAllExpensesByType({
                userId, 
                type, 
                initialDay, 
                finalDay,
                groupId
            });
            sum = await this.getSumExpensesByType({
                userId, 
                type, 
                initialDay, 
                finalDay, 
                groupId
            });
        }else if(status){
            expenses = await this.getAllExpensesByStatus({
                userId, 
                status, 
                initialDay, 
                finalDay, 
                groupId
            });
            sumIncome = await this.getSumExpensesByTypeAndStatus({
                userId, 
                type: 'INCOME', 
                initialDay, 
                finalDay, 
                status, 
                groupId
            });
            sumOutcome = await this.getSumExpensesByTypeAndStatus({
                userId, 
                type: 'OUTCOME', 
                initialDay, 
                finalDay, 
                status, 
                groupId
            });
            
            sum = {
                _sum: {
                    amout: 
                    (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - 
                    (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0)
                }
            };
        }else{
            expenses = await this.getAllExpensesById({
                userId, 
                initialDay, 
                finalDay, 
                groupId
            });
            sumIncome = await this.getSumExpensesByType({
                userId, 
                type: 'INCOME', 
                initialDay, 
                finalDay, 
                groupId
            });
            sumOutcome = await this.getSumExpensesByType({
                userId, 
                type: 'OUTCOME', 
                initialDay, 
                finalDay, 
                groupId
            });
            sum = {
                _sum: {
                    amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - 
                    (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0)
                }
            };
        }
        
        return {expenses, sum: sum?._sum};
    }

    async getAllExpensesById(
        {
            finalDay, 
            groupId, 
            userId, 
            initialDay
        }: GetExpense
    ) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId,
                groupId,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByTypeAndStatus(
        {
            finalDay,
            groupId, 
            userId, 
            initialDay, 
            status, 
            type
        }:GetExpense
    ) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId,
                type,
                status,
                groupId,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByType(
        {
            finalDay, 
            groupId, 
            initialDay, 
            type, 
            userId
        }: GetExpense 
    ) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId,
                type,
                groupId,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByStatus(
        {
            finalDay, 
            groupId, 
            initialDay,
            status, 
            userId
        }: GetExpense
    ) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId,
                status,
                groupId,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getSumExpensesById(id: string, initialDay: Date, finalDay: Date) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: id,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async getSumExpensesByTypeAndStatus(
        {
            finalDay, 
            groupId, 
            userId, 
            initialDay, 
            status, 
            type
        }: GetExpense
    ) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId,
            type,
            status,
            groupId,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async getSumExpensesByType(
        {
            finalDay, 
            groupId, 
            initialDay, 
            type, 
            userId
        }:GetExpense
    ) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId,
            type,
            groupId,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async getSumExpensesByStatus(
        {
            finalDay, 
            groupId, 
            initialDay, 
            userId, 
            status
        } : GetExpense
    ) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId,
            status,
            groupId,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async create({ amount, title, type, userId, dueDate, status, groupId}: ExpenseCreate): Promise<Expense> {
        const expense = await prisma.expense.create({
            data:{
                amount, 
                title, 
                type, 
                userId,
                status,
                dueDate,
                groupId
            }
        });
        return expense;
    }

    async updateStatus(status: string, id: string) {
        return await prisma.expense.update({
            data: {
                status: status
            }, where:{
                id: id
            }
        });
    }

    async deleteExpenseById(id: string) {
        const expense = await prisma.expense.delete({
            where:{
                id: id
            }
        });
        return expense;
    }

    async getExpenseById(id: string) {
        const expense = await prisma.expense.findUnique({
            where:{
                id: id
            }
        });
        return expense;
    }

}
