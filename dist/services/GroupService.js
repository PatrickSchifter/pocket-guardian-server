"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const GroupRepository_1 = require("../repository/GroupRepository");
const GroupUserRepository_1 = require("../repository/GroupUserRepository");
const InviteRepository_1 = require("../repository/InviteRepository");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const InviteEmailSenderService_copy_1 = require("./InviteEmailSenderService copy");
class GroupService {
    groupRepository;
    groupUserRepository;
    inviteRepository;
    userRepository;
    inviteEmailSender;
    constructor() {
        this.groupRepository = new GroupRepository_1.GroupRepository();
        this.groupUserRepository = new GroupUserRepository_1.GroupUserRepository();
        this.inviteRepository = new InviteRepository_1.InviteRepository();
        this.userRepository = new UserRepository_1.default();
        this.inviteEmailSender = new InviteEmailSenderService_copy_1.InviteEmailSender();
    }
    async create({ name, adminId }) {
        const group = await this.groupRepository.create({ adminId, name });
        const groupUser = await this.groupUserRepository.create({ groupId: group.id, userId: adminId });
        return { group, groupUser };
    }
    async invite({ groupId, email, invited_by }) {
        const verifyInviteExists = await this.inviteRepository.getInviteByEmailAndGroupId({ email, groupId });
        if (verifyInviteExists) {
            return { statusCode: 409, message: 'Invite already send.' };
        }
        const invited = await this.userRepository.findByEmail(email);
        const invite = await this.inviteRepository.create({ email, groupId, invited_by, userId: invited ? invited.id : null });
        const group = await this.groupRepository.getGroupById(groupId);
        const invitedBy = await this.userRepository.findById(invited_by);
        if (!group) {
            return { statusCode: 404, message: 'Group not found.' };
        }
        if (!invitedBy) {
            return { statusCode: 404, message: 'Inviter not found.' };
        }
        this.inviteEmailSender.sendEmail(email, group.name, invitedBy.name);
        return { statusCode: 201, message: 'Created', data: invite };
    }
    async getGroup({ userId }) {
        const groups = await this.groupUserRepository.getGroupUserByUserId(userId);
        return { statusCode: 200, message: '', data: groups };
    }
    async inviteReponse({ userId, id, response }) {
        let invite = await this.inviteRepository.getInviteById({ id });
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }
        if (invite) {
            if (invite.userId === user.id || invite.email === user.email) {
                await this.inviteRepository.updateReponse({ id, response });
                if (response) {
                    await this.groupUserRepository.create({ groupId: invite.groupId, userId: user.id });
                }
            }
            else {
                return { statusCode: 403, message: 'User not authorized to update this invite.' };
            }
        }
        else {
            return { statusCode: 404, message: 'Invite not found.' };
        }
        invite = await this.inviteRepository.getInviteById({ id });
        return { statusCode: 201, message: 'Acepted', data: invite };
    }
    async getGroupExepenseByUserId({ userId }) {
        const group = await this.groupRepository.getGroupExpenseByUserId({ userId });
        return { statusCode: 200, message: '', data: group };
    }
}
exports.GroupService = GroupService;
