import { ExpenseRepository } from "../repository/ExpenseRepository";
import { Expense, ExpenseCreate } from "../interfaces/ExpenseInterface";
import { GroupUserRepository } from "../repository/GroupUserRepository";
export class ExpenseService {
    private expenseRepository: ExpenseRepository;
    private groupUserRepository: GroupUserRepository;

    constructor(){
        this.expenseRepository = new ExpenseRepository();
        this.groupUserRepository = new GroupUserRepository();
    }

    async create({amount, dueDate, status, title, type, userId, groupId}: ExpenseCreate) {
        // VERIFICAR SE O USUÁRIO QUE ESTÁ TENTANDO INSERIR ESTÁ NO GROUPUSER
        const userGroupExists = await this.groupUserRepository.getGroupUserByGroupIdAndUserId({groupId, userId});
        if(!userGroupExists){
            return {statusCode: 403, message: 'User don`t have acess to this group.'};
        }
        const charge = await this.expenseRepository.create({amount, dueDate, status, title, type, userId, groupId});
        return {statusCode: 201, message: 'Created.', data: charge};
    }

    async getAllExpenses({
        finalDay, 
        groupId, 
        userId, 
        initialDay, 
        status, 
        type
    }:{
        userId:string; 
        initialDay: Date; 
        finalDay: Date; 
        type: string | undefined; 
        status: string | undefined; 
        groupId: string
    }) {
        const expenses = await this.expenseRepository.getAllExpenses({userId, initialDay, finalDay, status: status, type: type, groupId: groupId});
        return {statusCode: 200, data: expenses, message: null};
    }

    async setPaid(id:string){
        return await this.expenseRepository.updateStatus("Paid", id);
    }

    async delete(id:string){
        return await this.expenseRepository.deleteExpenseById(id);
    }
}
