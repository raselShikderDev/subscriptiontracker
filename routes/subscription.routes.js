import { Router } from "express";
import { createSubscription, getUserSubscription } from "../controller/subscriptionController";
import { authorize } from "../middlewares/authorizeMiddleware";

const subscriptionRoutes = Router()

subscriptionRoutes.get("/", (req, res)=> res.send({body:{title:"Get all users subcription details"}}))
subscriptionRoutes.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));
subscriptionRoutes.post("/", authorize, createSubscription)
subscriptionRoutes.get("/users/:id", authorize, getUserSubscription)
subscriptionRoutes.delete("users/subscription/:id", (req, res)=> res.send({body:{title:"Deleting an user subcription details"}}))
export default subscriptionRoutes

