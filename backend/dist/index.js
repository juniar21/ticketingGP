"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./routers/auth.routes");
const cors_1 = __importDefault(require("cors"));
const authO_routes_1 = require("./routers/authO.routes");
const order_routes_1 = require("./routers/order.routes");
const points_routes_1 = require("./routers/points.routes");
const events_routes_1 = require("./routers/events.routes");
const path_1 = __importDefault(require("path"));
const ticket_routes_1 = require("./routers/ticket.routes");
const PORT = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.URL_FE,
}));
app.get("/", (req, res) => {
    res.status(200).send({
        status: "success",
        message: "Welcome to my API",
    });
});
app.use("/api/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
const authRouter = new auth_routes_1.AuthRouter();
app.use("/api/auth", authRouter.getRouter());
const authRouterO = new authO_routes_1.AuthRouterO();
app.use("/api/auth", authRouterO.getRouter());
const order = new order_routes_1.OrderRouter();
app.use("/api/orders", order.getRouter());
const pointAuth = new points_routes_1.PointsRouter();
app.use("/api/points", pointAuth.getRouter());
const evenRouter = new events_routes_1.EventRoutes();
app.use("/api/events", evenRouter.getRouter());
const ticketRouter = new ticket_routes_1.TicketRouter();
app.use("/api/tickets", ticketRouter.getRouter());
app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
});
