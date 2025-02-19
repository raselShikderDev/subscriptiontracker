import { Router } from "express";
import { signIn, signUp, signOut } from "../controller/auth.js";
const authRouter = Router()

// POST "/api/v1/auth/signup" Body:{name, username, email, password} => IT will create new user

authRouter.post("/signout", signOut)
authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)

export default authRouter