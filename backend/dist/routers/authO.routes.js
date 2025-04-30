"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouterO = void 0;
const express_1 = require("express");
const authO_controller_1 = require("../controllers/authO.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_1 = require("../middleware/validation");
class AuthRouterO {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authCrontoller = new authO_controller_1.AuthControllerO();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/organizer/register", validation_1.validateRegister, this.authCrontoller.register);
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRouterO = AuthRouterO;
