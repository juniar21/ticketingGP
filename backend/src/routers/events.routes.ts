import { Router } from "express";
import { EventsController } from "../controllers/events.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { uploader } from "../helpers/uploader";

export class EventRoutes {
  private router: Router;
  private eventController: EventsController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.eventController = new EventsController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/",
      this.authMiddleware.verifyToken,
      this.authMiddleware.verifyPromotor,
      this.eventController.PostEvents
    );
    this.router.get(
      "/getEve",
      this.authMiddleware.verifyToken,
      this.eventController.GetEvent
    );
    this.router.get("/getAllEve", this.eventController.GetEventAll);
    this.router.post(
      "/cloud",
      uploader("memoryStorage", "ig-").single("image"),
      this.authMiddleware.verifyToken,
      this.eventController.createPostCloud
    );
    this.router.get("/getEveTic", this.eventController.GetEventTicket);
  }

  public getRouter(): Router {
    return this.router;
  }
}
