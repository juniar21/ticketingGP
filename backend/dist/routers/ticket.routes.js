"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tickets_controller_1 = require("../controllers/tickets.controller");
class TicketRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.ticketCrontoller = new tickets_controller_1.ticketController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.ticketCrontoller.PostTicket);
        this.router.get("/getTicket", this.ticketCrontoller.GetTicket);
        this.router.get("/:eventId", this.ticketCrontoller.GetTicketById);
    }
    getRouter() {
        return this.router;
    }
}
exports.TicketRouter = TicketRouter;
