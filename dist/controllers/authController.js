"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterService_1 = require("../services/RegisterService");
const JwtTokenService_1 = require("../services/JwtTokenService");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const password_1 = require("../utils/password");
class AuthController {
    registerService;
    userRepository;
    constructor() {
        this.registerService = new RegisterService_1.RegisterService();
        this.userRepository = new UserRepository_1.default();
    }
    async register(req, res) {
        const { email, name, password } = req.body;
        try {
            const userData = await this.registerService.register(name, email, password);
            res.send(userData);
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    async confirmEmail(req, res) {
        const { id } = req.params;
        try {
            const result = await this.registerService.confirmEmail(id);
            res.send(result);
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const userData = await this.userRepository.findByEmail(email);
        try {
            if (!userData) {
                res.status(403).send({
                    erro: 'Email não encontrado. Verifique o email e tente novamente ou registre-se.',
                });
            }
            else {
                const passwordMatch = await (0, password_1.validatePassword)(password, userData.password);
                if (!passwordMatch) {
                    res.status(401).send({
                        erro: 'Credenciais inválidas. Verifique o usuário e senha.',
                    });
                }
                if (!userData.confirmed) {
                    res.status(403).send({ erro: 'Email not confirmed.' });
                }
                else {
                    const jwt = JwtTokenService_1.TokenService.generateToken({
                        email: email,
                        iduser: userData.id,
                    });
                    res.status(200).send({
                        data: {
                            token: jwt,
                            userId: userData.id,
                            userName: userData.name,
                        },
                    });
                }
            }
        }
        catch (error) {
            res.send(error);
        }
    }
    ;
}
;
exports.default = AuthController;
