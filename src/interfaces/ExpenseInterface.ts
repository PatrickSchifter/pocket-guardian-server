export interface ExpenseCreate {
    title: string;
    amount: number;
    type: string;
    userId: string;
    status: string;
    dueDate: Date | null;
    groupId: string;
}

export interface Expense extends ExpenseCreate{
    id: string;
}
