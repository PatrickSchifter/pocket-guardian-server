import { PrismaClient } from '@prisma/client';
import { Expense, ExpenseCreate } from '../interfaces/ExpenseInterface';
const prisma = new PrismaClient();

export class ExpenseRepository {
    async getAllExpenses({id, initialDay, finalDay, type, status}: {id: string, initialDay: Date, finalDay: Date, type?: string, status?: string}) {
        let expenses;
        let sum;
        let sumIncome;
        let sumOutcome;

        if (type && status ){
             expenses = await this.getAllExpensesByTypeAndStatus(id, type, initialDay, finalDay, status);
             sum = await this.getSumExpensesByTypeAndStatus(id, type, initialDay, finalDay, status);
        }else if(type){
            expenses = await this.getAllExpensesByType(id, type, initialDay, finalDay);
            sum = await this.getSumExpensesByType(id, type, initialDay, finalDay);
        }else if(status){
            expenses = await this.getAllExpensesByStatus(id, status, initialDay, finalDay);
            sumIncome = await this.getSumExpensesByTypeAndStatus(id, 'INCOME', initialDay, finalDay, status);
            sumOutcome = await this.getSumExpensesByTypeAndStatus(id, 'OUTCOME', initialDay, finalDay, status);
            sum = {_sum: {amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0)}};
        }else{
            expenses = await this.getAllExpensesById(id, initialDay, finalDay);
            sumIncome = await this.getSumExpensesByType(id, 'INCOME', initialDay, finalDay);
            sumOutcome = await this.getSumExpensesByType(id, 'OUTCOME', initialDay, finalDay);
            sum = {_sum: {amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0)}};
        }
        
        return {expenses, sum: sum?._sum};
    }

    async getAllExpensesById(id: string, initialDay: Date, finalDay: Date) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId: id,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByTypeAndStatus(id: string, type: string, initialDay: Date, finalDay: Date, status: string) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId: id,
                type: type,
                status: status,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByType(id: string, type: string, initialDay: Date, finalDay: Date) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId: id,
                type: type,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }

    async getAllExpensesByStatus(id: string, status: string, initialDay: Date, finalDay: Date) {
        const expenses = await prisma.expense.findMany({
            where:{
                userId: id,
                status: status,
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

    async getSumExpensesByTypeAndStatus(id: string, type: string, initialDay: Date, finalDay: Date, status: string) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: id,
            type: type,
            status: status,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async getSumExpensesByType(id: string, type: string, initialDay: Date, finalDay: Date) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: id,
            type: type,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async getSumExpensesByStatus(id: string, status: string, initialDay: Date, finalDay: Date) {
        const sum = await prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: id,
            status: status,
            dueDate: {
                gte: initialDay,
                lt: finalDay,
            }
          },
        });
        return sum;
    }

    async create({ amount, title, type, userId, dueDate, status}: ExpenseCreate): Promise<Expense> {
        const expense = await prisma.expense.create({
            data:{
                amount, 
                title, 
                type, 
                userId,
                status,
                dueDate
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
