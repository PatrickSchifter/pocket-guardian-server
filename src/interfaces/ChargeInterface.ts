export interface ChargeCreate {
    description: string;
    adminId: number;
}

export interface Charge extends ChargeCreate{
    id: number;
}