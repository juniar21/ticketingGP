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
  }

  getRouter(): Router {
    return this.router;
  }
}