"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const uploader_1 = require("../helpers/uploader");
class EventRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.eventController = new events_controller_1.EventsController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.authMiddleware.verifyPromotor, this.eventController.PostEvents);
        this.router.get("/getEve", this.authMiddleware.verifyToken, this.eventController.GetEvent);
        this.router.get("/getAllEve", this.eventController.GetEventAll);
        this.router.post("/cloud", (0, uploader_1.uploader)("memoryStorage", "ig-").single("image"), this.authMiddleware.verifyToken, this.eventController.createPostCloud);
        this.router.get("/getEveTic", this.eventController.GetEventTicket);
        this.router.get("/dashmetric", this.authMiddleware.verifyToken, this.eventController.getDashboardMetrics),
            this.router.get("/:id", this.eventController.getEventById);
    }
    getRouter() {
        return this.router;
    }
}
exports.EventRoutes = EventRoutes;
