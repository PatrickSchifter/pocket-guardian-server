"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const ConfirmationEmailSenderService_1 = require("./ConfirmationEmailSenderService");
class RegisterService {
    userRepository;
    confirmationEmailSender;
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.confirmationEmailSender = new ConfirmationEmailSenderService_1.ConfirmationEmailSender();
    }
    async register(name, email, password) {
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new Error('User already exists');
        }
        const userData = await this.userRepository.createUser(name, email, password);
        await this.confirmationEmailSender.sendEmail(userData.email, userData.id);
        return userData;
    }
    async confirmEmail(id) {
        await this.userRepository.confirmEmail(id);
        return { confirmed: true };
    }
}
exports.RegisterService = RegisterService;
