import UserRepository from "../repository/UserRepository";
import { GroupUserRepository } from "../repository/GroupUserRepository";
import { GroupRepository } from "../repository/GroupRepository";
import { ConfirmationEmailSender } from "./ConfirmationEmailSenderService";
import { User } from "../interfaces/UserInterface";


export class RegisterService {
    private userRepository: UserRepository;
    private confirmationEmailSender: ConfirmationEmailSender; 
    private groupRepository: GroupRepository;
    private groupUserRepository: GroupUserRepository;

    constructor(){
        this.userRepository = new UserRepository();
        this.groupRepository = new GroupRepository();
        this.groupUserRepository = new GroupUserRepository();
        this.confirmationEmailSender = new ConfirmationEmailSender();
    }

    async register(name: string, email: string, password: string) {
        const emailExists = await this.userRepository.findByEmail(email);

        if(emailExists){
            throw new Error('User already exists');
        }

        const userData = await this.userRepository.createUser(name, email, password);
        const group = await this.groupRepository.create({adminId: userData.id, name: 'Personal'});
        const groupUser = await this.groupUserRepository.create({groupId: group.id, userId: userData.id})
        await this.confirmationEmailSender.sendEmail(userData.email, userData.id);
        return {
            user: userData,
            group: group,
            groupUser: groupUser
        };
    }

    async confirmEmail(id: string): Promise<{confirmed: boolean}> {
        await this.userRepository.confirmEmail(id);
        return {confirmed: true};
    }
}
