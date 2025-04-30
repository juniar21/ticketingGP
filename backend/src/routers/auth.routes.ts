import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateRegister } from "../middleware/validation";

export class AuthRouter {
  private router: Router;
  private authCrontoller: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authCrontoller = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/customer/register",validateRegister,
      this.authCrontoller.register
    );
    this.router.post("/login", this.authCrontoller.login);
    this.router.patch(
      "/verify",
      this.authMiddleware.verifyToken,
      this.authCrontoller.verify
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
