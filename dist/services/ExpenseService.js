"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const ExpenseRepository_1 = require("../repository/ExpenseRepository");
class ExpenseService {
    expenseRepository;
    constructor() {
        this.expenseRepository = new ExpenseRepository_1.ExpenseRepository();
    }
    async create({ amount, dueDate, status, title, type, userId }) {
        const charge = await this.expenseRepository.create({ amount, dueDate, status, title, type, userId });
        return charge;
    }
    async getAllExpenses(id, initialDay, finalDay, type, status) {
        const expenses = await this.expenseRepository.getAllExpenses({ id, initialDay, finalDay, status: status, type: type });
        return expenses;
    }
    async setPaid(id) {
        return await this.expenseRepository.updateStatus("Paid", id);
    }
    async delete(id) {
        return await this.expenseRepository.deleteExpenseById(id);
    }
}
exports.ExpenseService = ExpenseService;
