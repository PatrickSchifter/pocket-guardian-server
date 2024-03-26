"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const GroupUserRepository_1 = require("../repository/GroupUserRepository");
const GroupRepository_1 = require("../repository/GroupRepository");
const ConfirmationEmailSenderService_1 = require("./ConfirmationEmailSenderService");
class RegisterService {
    userRepository;
    confirmationEmailSender;
    groupRepository;
    groupUserRepository;
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.groupRepository = new GroupRepository_1.GroupRepository();
        this.groupUserRepository = new GroupUserRepository_1.GroupUserRepository();
        this.confirmationEmailSender = new ConfirmationEmailSenderService_1.ConfirmationEmailSender();
    }
    async register(name, email, password) {
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new Error('User already exists');
        }
        const userData = await this.userRepository.createUser(name, email, password);
        const group = await this.groupRepository.create({ adminId: userData.id, name: 'Personal' });
        const groupUser = await this.groupUserRepository.create({ groupId: group.id, userId: userData.id });
        await this.confirmationEmailSender.sendEmail(userData.email, userData.id);
        return {
            user: userData,
            group: group,
            groupUser: groupUser
        };
    }
    async confirmEmail(id) {
        await this.userRepository.confirmEmail(id);
        return { confirmed: true };
    }
}
exports.RegisterService = RegisterService;
