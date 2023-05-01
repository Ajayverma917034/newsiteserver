import { Router } from "express";
import { login, loginAdm, register, registerAdm } from "../controllers/user.js";


const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/registerAdm', registerAdm);
userRouter.post('/loginAdm', loginAdm);
userRouter.post('/login', login);

export default userRouter;