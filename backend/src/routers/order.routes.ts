import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { Order } from "../controllers/order.controller";

export class OrderRouter {
  private router: Router;
  private orderCrontoller: Order;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.orderCrontoller = new Order();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/",
      this.authMiddleware.verifyToken,
      this.orderCrontoller.CreateOrder
    );
    this.router.post("/status", this.orderCrontoller.updateStatus);
    this.router.get("/getOrders", this.authMiddleware.verifyUser, this.orderCrontoller.GetOrder)
  }

  getRouter(): Router {
    return this.router;
  }
}
