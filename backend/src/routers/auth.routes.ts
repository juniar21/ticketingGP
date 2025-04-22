import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export class AuthRouter {
  private router: Router;
  private authCrontoller: AuthController;
 

  constructor() {
    this.router = Router();
    this.authCrontoller = new AuthController();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.authCrontoller.register);
    this.router.post("/login", this.authCrontoller.login)
  }

  getRouter(): Router {
    return this.router;
  }
}