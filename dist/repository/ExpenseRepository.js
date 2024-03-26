"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExpenseRepository {
    async getAllExpenses({ userId, initialDay, finalDay, type, status, groupId }) {
        let expenses;
        let sum;
        let sumIncome;
        let sumOutcome;
        if (type && status) {
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
        }
        else if (type) {
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
        }
        else if (status) {
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
                    amout: (sumIncome._sum.amount ? sumIncome._sum.amount : 0) -
                        (sumOutcome._sum.amount ? sumOutcome._sum.amount : 0)
                }
            };
        }
        else {
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
        return { expenses, sum: sum?._sum };
    }
    async getAllExpensesById({ finalDay, groupId, userId, initialDay }) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getAllExpensesByTypeAndStatus({ finalDay, groupId, userId, initialDay, status, type }) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getAllExpensesByType({ finalDay, groupId, initialDay, type, userId }) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getAllExpensesByStatus({ finalDay, groupId, initialDay, status, userId }) {
        const expenses = await prisma.expense.findMany({
            where: {
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
    async getSumExpensesByTypeAndStatus({ finalDay, groupId, userId, initialDay, status, type }) {
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
    async getSumExpensesByType({ finalDay, groupId, initialDay, type, userId }) {
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
    async getSumExpensesByStatus({ finalDay, groupId, initialDay, userId, status }) {
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
    async create({ amount, title, type, userId, dueDate, status, groupId }) {
        const expense = await prisma.expense.create({
            data: {
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
