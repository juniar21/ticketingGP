import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayload } from "../../custom";

export class AuthMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
           const token = req.header("Authorization")?.replace("Bearer ", "");
           if (!token) throw {message: "Unauthorized!"};

           const verifiedUser = verify(token, process.env.KEY_JWT!);

           req.user = verifiedUser as UserPayload;
           next();

        } catch (err) {
            console.log(err);
            res.status(400).send(err)
            
        }
    }

    verifyPromotor(req: Request, res: Response, next: NextFunction){
        try {
            if (req.user?.role !== "PROMOTOR") throw {message: "Promotor Only"};
            next()
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    }
}