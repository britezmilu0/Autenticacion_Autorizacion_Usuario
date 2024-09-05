import { Router } from "express";
import { loginCtrl, checkSessionCtrl,logoutCtrl } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginCtrl);
authRouter.get("/session", checkSessionCtrl);
authRouter.post("/logout", logoutCtrl );



export { authRouter }
