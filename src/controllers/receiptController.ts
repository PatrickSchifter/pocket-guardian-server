import { Request, Response } from 'express';
import {ReceiptService} from '../services/ReceiptService';
import { RequestUserId } from '../interfaces/RequestInterface';

export class ReceiptController {

    private receiptService: ReceiptService;

    constructor(){
        this.receiptService = new ReceiptService();
    }

    async create(req: Request, res: Response){
        const {amount, chargeId, name, status} = req.body;
        try {
            const receipt = await this.receiptService.create({amount, chargeId, name, status, url: null});
            res.send(receipt)
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllReceipts(req: Request, res: Response) {
        const { chargeId } = req.params;
        try {
            const receipts = await this.receiptService.getAllReceipts(parseInt(chargeId));
            res.send(receipts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async paymentConfirmation(req: RequestUserId, res: Response) {
        const {id} = req.body;
        const adminId = req.userId;
        try {
            if(!adminId){
                throw new Error('User not provided');
            }
            const receipt = await this.receiptService.paymentConfirmation(id, adminId);
            res.send(receipt);
        } catch (error:any) {
            if(error.message === "It must be admin to confirm payment"){
                res.status(403).send({error: error.message});
            }else{
                res.status(500).send(error.message)
            }

        }
    }

    async updateUrl(req: Request, res: Response) {
        const {url, id} = req.body;
        try {
            const receipt = await this.receiptService.updateUrl(url, id);
            res.send(receipt);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
