"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = async (req, reply, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            reply.status(401).send({ message: 'Token não encontrado.' });
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT || '');
        req.userId = decoded.data.iduser;
        next();
    }
    catch (err) {
        reply.status(401).send({ message: 'Token inválido' });
    }
};
const jwtAuthMiddleware = async (req, reply, next) => {
    try {
        await verifyJWT(req, reply, next);
    }
    catch (err) {
        reply.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.jwtAuthMiddleware = jwtAuthMiddleware;
