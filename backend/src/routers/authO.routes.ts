import { Router } from "express";
import { AuthControllerO } from "../controllers/authO.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateRegister } from "../middleware/validation";

export class AuthRouterO {
  private router: Router;
  private authCrontoller: AuthControllerO;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authCrontoller = new AuthControllerO();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/organizer/register",validateRegister,
      this.authCrontoller.register
    );
    this.router.post("/organizer/login", this.authCrontoller.login);
    this.router.patch(
      "/organizer/verify",
      this.authMiddleware.verifyToken,
      this.authCrontoller.verify
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
