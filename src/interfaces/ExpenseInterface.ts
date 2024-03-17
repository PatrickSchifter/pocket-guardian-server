export interface ExpenseCreate {
    title: string;
    amount: number;
    type: string;
    userId: string;
    status: string;
    dueDate: Date | null;
}

export interface Expense extends ExpenseCreate{
    id: string;
}
