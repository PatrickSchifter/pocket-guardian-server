"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const ExpenseService_1 = require("../services/ExpenseService");
const getInitalAndFinalDayOfMonth_1 = require("../utils/getInitalAndFinalDayOfMonth");
class ExpenseController {
    expenseService;
    constructor() {
        this.expenseService = new ExpenseService_1.ExpenseService();
    }
    async create(req, res) {
        const { title, amount, type, userId, status, dueDate } = req.body;
        try {
            if (userId) {
                const expense = await this.expenseService.create({ title, amount, type, userId, dueDate: new Date(dueDate), status });
                res.send(expense);
            }
            else {
                throw new Error('userId not reconized');
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                await this.expenseService.delete(id);
                res.status(204).send();
            }
            else {
                throw new Error('id not reconized');
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async setPaid(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                await this.expenseService.setPaid(id);
                res.status(204).send();
            }
            else {
                throw new Error('id not reconized');
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async getAllExpenses(req, res) {
        const userId = req.query.userid;
        const month = req.query.month;
        const type = req.query.type;
        const status = req.query.status;
        const { initialDay, finalDay } = (0, getInitalAndFinalDayOfMonth_1.getInitialAndFinalDayOfMonth)(parseInt(month.split('-')[0]), parseInt(month.split('-')[1]));
        try {
            if (userId) {
                const expenses = await this.expenseService.getAllExpenses(userId, initialDay, finalDay, type, status);
                res.send(expenses);
            }
            else {
                throw new Error('userId not reconized');
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}
exports.ExpenseController = ExpenseController;
;
