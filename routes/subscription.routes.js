import { Router } from "express";

const subscriptionRoutes = Router()

subscriptionRoutes.get("users/subscription", (req, res)=> res.send("Get all users subcription details"))
subscriptionRoutes.get("users/subscription/:id", (req, res)=> res.send("Geting specific an user subcription details"))
subscriptionRoutes.post("users/subscription", (req, res)=> res.send("Creating a user subcription details"))
subscriptionRoutes.put("users/subscription/:id", (req, res)=> res.send("Updating an existing user subcription details"))
subscriptionRoutes.delete("users/subscription/:id", (req, res)=> res.send("Deleting an user subcription details"))
export default subscriptionRoutes