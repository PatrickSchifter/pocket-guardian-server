"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const GroupService_1 = require("../services/GroupService");
class GroupController {
    groupService;
    constructor() {
        this.groupService = new GroupService_1.GroupService();
    }
    async getGroups(req, res) {
        const userId = req.userId;
        try {
            const group = await this.groupService.getGroupExepenseByUserId({ userId: userId.toString() });
            res.send(group);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async create(req, res) {
        const { name } = req.body;
        const userId = req.userId;
        try {
            const group = await this.groupService.create({ name, adminId: userId.toString() });
            res.send(group);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async invite(req, res) {
        const { email, groupId } = req.body;
        const userId = req.userId;
        try {
            const { statusCode, message, data } = await this.groupService.invite({ email, groupId, invited_by: userId.toString() });
            res.status(statusCode).send({ message, data });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    async inviteResponse(req, res) {
        const { id, response } = req.body;
        const userId = req.userId;
        try {
            const { statusCode, message, data } = await this.groupService.inviteReponse({ id, response, userId: userId.toString() });
            res.status(statusCode).send({ message, data });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}
exports.GroupController = GroupController;
;
