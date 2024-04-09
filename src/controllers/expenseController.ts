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
        const { title, amount, type, userId, status, dueDate, groupId} = req.body;

        try {
            if(userId){
                const {data, message, statusCode} = await this.expenseService.create({ title, amount, type, userId, dueDate: new Date(dueDate), status, groupId});
                res.status(statusCode).send({message, data});
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
        const userId = req.userId as unknown as {userId: string};
        const month = req.query.month as string;
        const type = req.query.type as string | undefined;
        const status = req.query.status as string | undefined;
        const groupId = req.query.groupid as string;
        const {initialDay, finalDay} = getInitialAndFinalDayOfMonth(parseInt(month.split('-')[0]),parseInt(month.split('-')[1]));
        try {
            const {data, message, statusCode} = await this.expenseService.getAllExpenses({ userId: userId.toString(), initialDay, finalDay, type, status, groupId});
            res.status(statusCode).send({message, data});
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
