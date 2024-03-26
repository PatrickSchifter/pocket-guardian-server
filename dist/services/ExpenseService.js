"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const ExpenseRepository_1 = require("../repository/ExpenseRepository");
const GroupUserRepository_1 = require("../repository/GroupUserRepository");
class ExpenseService {
    expenseRepository;
    groupUserRepository;
    constructor() {
        this.expenseRepository = new ExpenseRepository_1.ExpenseRepository();
        this.groupUserRepository = new GroupUserRepository_1.GroupUserRepository();
    }
    async create({ amount, dueDate, status, title, type, userId, groupId }) {
        // VERIFICAR SE O USUÁRIO QUE ESTÁ TENTANDO INSERIR ESTÁ NO GROUPUSER
        const userGroupExists = await this.groupUserRepository.getGroupUserByGroupIdAndUserId({ groupId, userId });
        if (!userGroupExists) {
            return { statusCode: 403, message: 'User don`t have acess to this group.' };
        }
        const charge = await this.expenseRepository.create({ amount, dueDate, status, title, type, userId, groupId });
        return { statusCode: 201, message: 'Created.', data: charge };
    }
    async getAllExpenses({ finalDay, groupId, userId, initialDay, status, type }) {
        const expenses = await this.expenseRepository.getAllExpenses({ userId, initialDay, finalDay, status: status, type: type, groupId: groupId });
        return { statusCode: 200, data: expenses, message: null };
    }
    async setPaid(id) {
        return await this.expenseRepository.updateStatus("Paid", id);
    }
    async delete(id) {
        return await this.expenseRepository.deleteExpenseById(id);
    }
}
exports.ExpenseService = ExpenseService;
