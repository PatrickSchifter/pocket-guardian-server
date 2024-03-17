import { ExpenseRepository } from "../repository/ExpenseRepository";
import { Expense, ExpenseCreate } from "../interfaces/ExpenseInterface";

export class ExpenseService {
    private expenseRepository: ExpenseRepository;

    constructor(){
        this.expenseRepository = new ExpenseRepository();
    }

    async create({amount, dueDate, status, title, type, userId}: ExpenseCreate): Promise<Expense | null> {
        const charge = await this.expenseRepository.create({amount, dueDate, status, title, type, userId});
        return charge;
    }

    async getAllExpenses(id:string, initialDay: Date, finalDay: Date, type: string | undefined, status: string | undefined) {
        const expenses = await this.expenseRepository.getAllExpenses({id, initialDay, finalDay, status: status, type: type});
        return expenses;
    }

    async setPaid(id:string){
        return await this.expenseRepository.updateStatus("Paid", id);
    }

    async delete(id:string){
        return await this.expenseRepository.deleteExpenseById(id);
    }
}
