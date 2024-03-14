import ChargeRepository from "../repository/ChargeRepository";
import { ChargeCreate, Charge } from "../interfaces/ChargeInterface";

export class ChargeService {
    private chargeRepository: ChargeRepository;

    constructor(){
        this.chargeRepository = new ChargeRepository();
    }

    async create({adminId, description}: ChargeCreate): Promise<Charge | null> {
        const charge = await this.chargeRepository.create({adminId, description});
        return charge;
    }

    async getAllCharges(id:number): Promise<Charge[] | null> {
        const charges = await this.chargeRepository.getAllCharges(id);
        return charges
    }
}
