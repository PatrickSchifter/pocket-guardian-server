export interface ReceiptCreate{
    name: string;
    url: string | null;
    status: string;
    amount: number;
    chargeId: number;
    paid?: boolean
}

export interface Receipt extends ReceiptCreate{
    id: number;
}