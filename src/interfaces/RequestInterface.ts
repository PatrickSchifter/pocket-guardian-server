import { Request } from "express";

export interface RequestUserId extends Request {
    userId?: number | null
}