import { GroupCreate } from "../interfaces/GroupInterface";
import { GroupRepository } from "../repository/GroupRepository";
import { GroupUserRepository } from "../repository/GroupUserRepository";
import { InviteCreate } from "../interfaces/InviteInterface";
import { InviteRepository } from "../repository/InviteRepository";
import UserRepository from "../repository/UserRepository";
import { InviteEmailSender } from "./InviteEmailSenderService copy";
import { config } from "../config/config";

export class GroupService {
    private groupRepository: GroupRepository;
    private groupUserRepository: GroupUserRepository;
    private inviteRepository: InviteRepository;
    private userRepository: UserRepository;
    private inviteEmailSender: InviteEmailSender;

    constructor(){
        this.groupRepository = new GroupRepository();
        this.groupUserRepository = new GroupUserRepository();
        this.inviteRepository = new InviteRepository();
        this.userRepository = new UserRepository();
        this.inviteEmailSender = new InviteEmailSender();
    }

    async create({name, adminId}: GroupCreate) {
        const group = await this.groupRepository.create({adminId, name});
        const groupUser= await this.groupUserRepository.create({ groupId: group.id, userId: adminId })
        return {group, groupUser};
    }

    async invite({groupId, email, invited_by}: {groupId: string, email: string, invited_by: string}) {
        const verifyInviteExists = await this.inviteRepository.getInviteByEmailAndGroupId({email, groupId});
        if(verifyInviteExists){
            return {statusCode: 409, message: 'Invite already send.'}
        }
        const invited = await this.userRepository.findByEmail(email);

        const invite = await this.inviteRepository.create({email, groupId, invited_by, userId: invited ? invited.id : null});
        const group = await this.groupRepository.getGroupById(groupId);
        const invitedBy = await this.userRepository.findById(invited_by);
        if(!group){
            return {statusCode: 404, message: 'Group not found.'};
        }
        if(!invitedBy){
            return {statusCode: 404, message: 'Inviter not found.'};
        }
        this.inviteEmailSender.sendEmail(email, group.name, invitedBy.name);
        
        return {statusCode: 201, message: 'Created', data: invite};
    }

    async getGroup({userId}: {userId: string}){
        const groups = await this.groupUserRepository.getGroupUserByUserId(userId);
        return {statusCode: 200, message: '', data: groups}
    }

    async inviteReponse({userId, id, response}: {userId: string, id: string, response: boolean}) { 
        let invite = await this.inviteRepository.getInviteById({id});
        const user = await this.userRepository.findById(userId);

        if(!user){
            return {statusCode: 404, message: 'User not found'};
        }

        if(invite){
            if(invite.userId === user.id || invite.email === user.email){
                await this.inviteRepository.updateReponse({id, response});
                if(response){
                    await this.groupUserRepository.create({groupId: invite.groupId, userId: user.id})
                }
            }else{
                return {statusCode: 403, message: 'User not authorized to update this invite.'};
            }
        }else{
            return {statusCode: 404, message: 'Invite not found.'};
        }

        invite = await this.inviteRepository.getInviteById({id});

        return {statusCode: 201, message: 'Acepted', data: invite};
    }

    async getGroupExepenseByUserId({ userId }: { userId: string }) {
        const group = await this.groupRepository.getGroupExpenseByUserId({userId});
        return {statusCode: 200, message: '', data: group}
    } 
}
