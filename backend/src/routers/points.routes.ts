import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateRegister } from "../middleware/validation";
import { PointsController } from "../controllers/points.controller";

export class PointsRouter {
  private router: Router;
  private pointCrontoller: PointsController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.pointCrontoller = new PointsController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(
      "/",this.authMiddleware.verifyToken,
      this.pointCrontoller.getPointsVoucher
    );
    
  }

  getRouter(): Router {
    return this.router;
  }
}