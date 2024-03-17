import { Request, Response } from 'express';
import { ExpenseService } from '../services/ExpenseService';
import { RequestUserId } from '../interfaces/RequestInterface';
import { getInitialAndFinalDayOfMonth } from '../utils/getInitalAndFinalDayOfMonth';

export class ExpenseController {

    private expenseService: ExpenseService;

    constructor(){
        this.expenseService = new ExpenseService();
    }

    async create(req: Request, res: Response){
        const { title, amount, type, userId, status, dueDate} = req.body;

        try {
            if(userId){
                const expense = await this.expenseService.create({ title, amount, type, userId, dueDate: new Date(dueDate), status});
                res.send(expense);
            }else{
                throw new Error('userId not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async delete(req: Request, res: Response){
        const id = req.params.id as string;
        try {
            if(id){
                await this.expenseService.delete(id);
                res.status(204).send();
            }else{
                throw new Error('id not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async setPaid(req: Request, res: Response){
        const id = req.params.id as string;
        try {
            if(id){
                await this.expenseService.setPaid(id);
                res.status(204).send();
            }else{
                throw new Error('id not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllExpenses(req: RequestUserId, res: Response){
        const userId = req.query.userid as string;
        const month = req.query.month as string;
        const type = req.query.type as string | undefined;
        const status = req.query.status as string | undefined;
        const {initialDay, finalDay} = getInitialAndFinalDayOfMonth(parseInt(month.split('-')[0]),parseInt(month.split('-')[1]));
        try {
            if(userId){
                const expenses = await this.expenseService.getAllExpenses(userId, initialDay, finalDay, type,status);

                res.send(expenses);
            }else{
                throw new Error('userId not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
