"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    verifyToken(req, res, next) {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw { message: "Unauthorized!" };
            const verifiedUser = (0, jsonwebtoken_1.verify)(token, process.env.KEY_JWT);
            req.user = verifiedUser;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    verifyPromotor(req, res, next) {
        var _a;
        try {
            console.log(req.user);
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.Role) !== "PROMOTOR")
                throw { message: "Promotor Only" };
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
    verifyUser(req, res, next) {
        var _a;
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.Role) !== "USER")
                throw { message: "CUSTOMER Only" };
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
