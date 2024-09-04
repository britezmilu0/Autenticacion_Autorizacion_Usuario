import { Router } from "express";
import { loginCtrl } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginCtrl);



export { authRouter }
