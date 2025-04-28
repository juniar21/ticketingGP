import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateRegister } from "../middleware/validation";
import { ticketController } from "../controllers/tickets.controller";

export class TicketRouter {
  private router: Router;
  private ticketCrontoller: ticketController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.ticketCrontoller = new ticketController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/",
      this.authMiddleware.verifyToken,
      this.ticketCrontoller.PostTicket
    );
    this.router.get(
      "/getticket",
      this.authMiddleware.verifyToken,
      this.ticketCrontoller.PostTicket
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
