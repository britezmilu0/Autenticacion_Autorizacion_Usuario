import { Router } from "express"; 
import { loginCtrl, authLogout,authSession, authRegister } from "../controllers/authControllers.js";
import validarJwt from "../../middlewares/validar-jwt.js";

export const authRouter = Router();

authRouter.post("/login", loginCtrl);
authRouter.post("/logout", authLogout);
authRouter.get("/session", validarJwt, authSession);
authRouter.post("/register", authRegister);
