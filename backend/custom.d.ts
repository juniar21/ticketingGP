import "express";

export type UserPayload = {
  id: number;
  Role: "USER" | "PROMOTOR";
};

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
