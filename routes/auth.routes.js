import { Router } from "express";
import { signIn, signUp, signOut } from "../controller/auth";
const authRouter = Router()

authRouter.get("/signout", signOut)
authRouter.get("/signup", signUp)
authRouter.get("/signin", signIn)

export default authRouter