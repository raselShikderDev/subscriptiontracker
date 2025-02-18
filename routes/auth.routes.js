import { Router } from "express";

const authRouter = Router()

authRouter.get("/", (req, res)=> res.send("Router"))
authRouter.get("/signup", (req, res)=> res.send("SignUp Router"))
authRouter.get("/signin", (req, res)=> res.send("signin Router"))

export default authRouter