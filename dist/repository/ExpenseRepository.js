"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExpenseRepository {
    async getAllExpenses({ id, initialDay, finalDay, type, status }) {
        let expenses;
        let sum;
        let sumIncome;
        let sumOutcome;
        if (type && status) {
            expenses = await this.getAllExpensesByTypeAndStatus(id, type, initialDay, finalDay, status);
            sum = await this.getSumExpensesByTypeAndStatus(id, type, initialDay, finalDay, status);
        }
        else if (type) {
            expenses = await this.getAllExpensesByType(id, type, initialDay, finalDay);
            sum = await this.getSumExpensesByType(id, type, initialDay, finalDay);
        }
        else if (status) {
            expenses = await this.getAllExpensesByStatus(id, status, initialDay, finalDay);
            sumIncome = await this.getSumExpensesByTypeAndStatus(id, 'INCOME', initialDay, finalDay, status);
            sumOutcome = await this.getSumExpensesByTypeAndStatus(id, 'OUTCOME', initialDay, finalDay, status);
            sum = { _sum: { amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0) } };
        }
        else {
            expenses = await this.getAllExpensesById(id, initialDay, finalDay);
            sumIncome = await this.getSumExpensesByType(id, 'INCOME', initialDay, finalDay);
            sumOutcome = await this.getSumExpensesByType(id, 'OUTCOME', initialDay, finalDay);
            sum = { _sum: { amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) - (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0) } };
        }
        return { expenses, sum: sum?._sum };
    }
    async getAllExpensesById(id, initialDay, finalDay) {
        const expenses = await prisma.expense.findMany({
            where: {
                userId: id,
                dueDate: {
                    gte: initialDay,
                    lt: finalDay,
                }
            }
        });
        return expenses;
    }
    async getAllExpensesByTypeAndStatus(id, type, initialDay, finalDay, status) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getAllExpensesByType(id, type, initialDay, finalDay) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getAllExpensesByStatus(id, status, initialDay, finalDay) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getSumExpensesById(id, initialDay, finalDay) {
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
    async getSumExpensesByTypeAndStatus(id, type, initialDay, finalDay, status) {
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
    async getSumExpensesByType(id, type, initialDay, finalDay) {
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
    async getSumExpensesByStatus(id, status, initialDay, finalDay) {
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
    async create({ amount, title, type, userId, dueDate, status }) {
        const expense = await prisma.expense.create({
            data: {
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
    async updateStatus(status, id) {
        return await prisma.expense.update({
            data: {
                status: status
            }, where: {
                id: id
            }
        });
    }
    async deleteExpenseById(id) {
        const expense = await prisma.expense.delete({
            where: {
                id: id
            }
        });
        return expense;
    }
    async getExpenseById(id) {
        const expense = await prisma.expense.findUnique({
            where: {
                id: id
            }
        });
        return expense;
    }
}
exports.ExpenseRepository = ExpenseRepository;
