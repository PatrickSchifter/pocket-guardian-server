import { Response } from 'express';
import { GroupService } from '../services/GroupService';
import { RequestUserId } from '../interfaces/RequestInterface';

export class GroupController {

    private groupService: GroupService;

    constructor(){
        this.groupService = new GroupService();
    }

    async getGroups(req: RequestUserId, res: Response){
        const userId = req.userId as unknown as {userId: string};

        try {
            const group = await this.groupService.getGroupExepenseByUserId({ userId: userId.toString() });
            res.send(group);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async create(req: RequestUserId, res: Response){
        const { name } = req.body;
        const userId = req.userId as unknown as {userId: string};

        try {
            const group = await this.groupService.create({ name, adminId: userId.toString() });
            res.send(group);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async invite(req: RequestUserId, res: Response){
        const { email, groupId } = req.body;
        const userId = req.userId as unknown as {userId: string};

        try {
            const {statusCode, message, data} = await this.groupService.invite({ email, groupId, invited_by: userId.toString()});
            res.status(statusCode).send({message, data});
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    async inviteResponse(req: RequestUserId, res: Response){
        const { id, response } = req.body;
        const userId = req.userId as unknown as {userId: string};

        try {
            const {statusCode, message, data} = await this.groupService.inviteReponse({ id, response, userId: userId.toString() });
            res.status(statusCode).send({message, data});
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }
};
