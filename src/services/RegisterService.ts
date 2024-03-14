import UserRepository from "../repository/UserRepository";
import { ConfirmationEmailSender } from "./ConfirmationEmailSenderService";
import { User } from "../interfaces/UserInterface";
import { encrypt, decrypt } from "../utils/encryptId";

export class RegisterService {
    private userRepository: UserRepository;
    private confirmationEmailSender: ConfirmationEmailSender; 

    constructor(){
        this.userRepository = new UserRepository();
        this.confirmationEmailSender = new ConfirmationEmailSender();
    }

    async register(name: string, email: string, password: string): Promise<User> {
        const emailExists = await this.userRepository.findByEmail(email);

        if(emailExists){
            throw new Error('User already exists');
        }

        const userData = await this.userRepository.createUser(name, email, password);
        await this.confirmationEmailSender.sendEmail(userData.email, encrypt(userData.id.toString()));
        return userData;
    }

    async confirmEmail(id: string): Promise<{confirmed: boolean}> {
        const decryptId = parseInt(decrypt(id));
        if(!decryptId){
            throw new Error('Incorrect id')
        }
        await this.userRepository.confirmEmail(decryptId);
            return {confirmed: true};
    }
}
