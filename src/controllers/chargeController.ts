import { Request, Response } from 'express';
import { ChargeService } from '../services/ChargeService';
import { RequestUserId } from '../interfaces/RequestInterface';
import { decrypt, encrypt } from '../utils/encryptId';
import { config } from '../config/config';

export class ChargeController {

    private chargeService: ChargeService;

    constructor(){
        this.chargeService = new ChargeService();
    }

    async create(req: RequestUserId, res: Response){
        const {description} = req.body;
        const userId = req.userId;

        try {
            if(userId){
                const charge = await this.chargeService.create({adminId: userId, description});
                res.send({charge, url: config.link.web + encrypt(userId.toString())});
            }else{
                throw new Error('userId not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllCharges(req: RequestUserId, res: Response){
        const userId = req.params.id;
        try {
            if(userId){
                const charges = await this.chargeService.getAllCharges(parseInt(decrypt(userId)));
                res.send(charges);
            }else{
                throw new Error('userId not reconized')
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
