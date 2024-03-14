import ReceiptRepository from "../repository/ReceiptRepository";
import { ReceiptCreate, Receipt } from "../interfaces/ReceiptInterface";
import ChargeRepository from "../repository/ChargeRepository";

export class ReceiptService {
    private receiptRepository: ReceiptRepository;
    private chargeRepository: ChargeRepository;

    constructor(){
        this.receiptRepository = new ReceiptRepository();
        this.chargeRepository = new ChargeRepository();
    }

    async create({amount, chargeId, name, status, url}: ReceiptCreate): Promise<Receipt | null> {
        const receipt = await this.receiptRepository.create({amount, chargeId, name, status, url});
        return receipt;
    }

    async getAllReceipts(chargeId: number): Promise<Receipt[] | null> {
        const receipts = await this.receiptRepository.getAllReceipts(chargeId)
        return receipts;
    }

    async paymentConfirmation(id:number, adminId: number): Promise<Receipt | null>{
        const receipt = await this.receiptRepository.getReceiptById(id);
        if(!receipt){
            throw new Error('Receipt not found');
        };

        const charge = await this.chargeRepository.getChargeById(receipt.chargeId);
        if(!charge){
            throw new Error('Charge not found');
        };

        if(charge.adminId !== adminId){
            throw new Error('It must be admin to confirm payment');
        }
        
        const payment = await this.receiptRepository.paymentConfirmation(id);
        return payment;
    }

    async updateUrl(url: string, id: number): Promise<Receipt | null>{
        const receiptExists = await this.receiptRepository.getReceiptById(id);

        if(!receiptExists){
            throw new Error('Receipt not found.');
        }
        
        const receipt = await this.receiptRepository.updateUrl(url, id);
        return receipt;
    }
}
