import { Request, Response } from 'express';
import { RegisterService } from '../services/RegisterService';
import { TokenService } from '../services/JwtTokenService';
import UserRepository from '../repository/UserRepository';
import { validatePassword } from '../utils/password';

class AuthController {
    private registerService: RegisterService;
    private userRepository: UserRepository;
    
    constructor(){
        this.registerService = new RegisterService();
        this.userRepository = new UserRepository();
    }

    async register(req: Request, res: Response){
        const {email, name, password} = req.body;
        try {
            const userData = await this.registerService.register(name, email, password);
            res.send(userData);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }

    }

    async confirmEmail(req: Request, res: Response){
        const {id} = req.params
        try {
            const result = await this.registerService.confirmEmail(id)
            res.send(result)
        } catch (error:any) {
            res.status(500).send({error: error.message})
        }

    }

    async login(req: Request, res: Response){
        const { email, password } = req.body;
        const userData = await this.userRepository.findByEmail(email);
        try {
        if (!userData) {
            res.status(403).send({
            erro: 'Email não encontrado. Verifique o email e tente novamente ou registre-se.',
            });
        } else {
            const passwordMatch = await validatePassword(
            password,
            userData.password
            );

            if (!passwordMatch) {
                res.status(401).send({
                erro: 'Credenciais inválidas. Verifique o usuário e senha.',
                });
            }

            if (!userData.confirmed) {
                res.status(403).send({ erro: 'Email not confirmed.' });
            }else{
                const jwt = TokenService.generateToken({
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
        } catch (error) {
            res.send(error);
        }
    };
};

export default AuthController;