import { Router } from "express";

const userRoutes = Router()

userRoutes.get("/users", (req, res)=>res.send({body:{title:"Getting all the users details"}}))
userRoutes.get("/users/:id", (req, res)=>res.send({body:{title:"Getting an specific users details"}}))
userRoutes.post("/users", (req, res)=>res.send({body:{title:"Adding an users details"}}))
userRoutes.put("/users/:id", (req, res)=>res.send({body:{title:"Updating an existing users details"}}))
userRoutes.delete("/users/:id", (req, res)=>res.send({body:{title:"Removing users details"}}))

export default userRoutes