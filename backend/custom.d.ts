import "express";

export type UserPayload = {
    id : number;
    role : "USER" | "PROMOTOR"
};

declare global {
    namespace Express {
        export interface Request {
            user?: UserPayload;
        }
    }
}
