"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const points_controller_1 = require("../controllers/points.controller");
class PointsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.pointCrontoller = new points_controller_1.PointsController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/", this.authMiddleware.verifyToken, this.pointCrontoller.getPointsVoucher);
    }
    getRouter() {
        return this.router;
    }
}
exports.PointsRouter = PointsRouter;
