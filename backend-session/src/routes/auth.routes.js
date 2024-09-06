import { Router } from "express";
import { loginCtrl, checkSessionCtrl,logoutCtrl, authRegister } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginCtrl);
authRouter.get("/session", checkSessionCtrl);
authRouter.post("/logout", logoutCtrl );
authRouter.post("/register", authRegister);



export { authRouter }
