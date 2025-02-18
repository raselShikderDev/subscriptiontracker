import { Router } from "express";

const subscriptionRoutes = Router()

subscriptionRoutes.get("users/subscription", (req, res)=> res.send({body:{title:"Get all users subcription details"}}))
subscriptionRoutes.get("users/subscription/:id", (req, res)=> res.send({body:{title:"Geting specific an user subcription details"}}))
subscriptionRoutes.post("users/subscription", (req, res)=> res.send({body:{title:"Creating a user subcription details"}}))
subscriptionRoutes.put("users/subscription/:id", (req, res)=> res.send({body:{title:"Updating an existing user subcription details"}}))
subscriptionRoutes.delete("users/subscription/:id", (req, res)=> res.send({body:{title:"Deleting an user subcription details"}}))
export default subscriptionRoutes