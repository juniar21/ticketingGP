"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
class OrderRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.orderCrontoller = new order_controller_1.Order();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.orderCrontoller.CreateOrder);
        this.router.post("/status", this.orderCrontoller.updateStatus);
        this.router.get("/getOrders", this.authMiddleware.verifyToken, this.authMiddleware.verifyPromotor, this.orderCrontoller.GetOrder);
        this.router.get("/getAllOrders", this.authMiddleware.verifyToken, this.orderCrontoller.GetOrderTicket);
        this.router.get("/get-order-id/:id", this.authMiddleware.verifyToken, this.orderCrontoller.GetOrderById);
    }
    getRouter() {
        return this.router;
    }
}
exports.OrderRouter = OrderRouter;
