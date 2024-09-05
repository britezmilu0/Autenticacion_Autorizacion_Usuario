import { Router } from "express"; 
import { loginCtrl, } from "../controllers/authControllers";

const authRouter = Router();

authRouter.post("/login", loginCtrl);
