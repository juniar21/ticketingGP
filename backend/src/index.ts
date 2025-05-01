import express, { Application, Request, Response } from "express";
import { AuthRouter } from "./routers/auth.routes";
import cors from "cors";
import { AuthRouterO } from "./routers/authO.routes";
import { OrderRouter } from "./routers/order.routes";
import { PointsRouter } from "./routers/points.routes";
import { EventRoutes } from "./routers/events.routes";
import path from "path";
import { TicketRouter } from "./routers/ticket.routes";


const PORT = 8000;

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FE,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    message: "Welcome to my API",
  });
});

app.use("/api/public", express.static(path.join(__dirname, "../public")));

const authRouter = new AuthRouter();
app.use("/api/auth", authRouter.getRouter());

const authRouterO = new AuthRouterO();
app.use("/api/auth", authRouterO.getRouter());

const order = new OrderRouter();
app.use("/api/orders", order.getRouter());

const pointAuth = new PointsRouter();
app.use("/api/points", pointAuth.getRouter());

const evenRouter = new EventRoutes();
app.use("/api/events", evenRouter.getRouter());

const ticketRouter = new TicketRouter();
app.use("/api/tickets", ticketRouter.getRouter());

app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});
