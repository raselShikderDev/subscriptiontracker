import { Router } from "express";

const workflowRouter = Router()

workflowRouter.get("/subscription/reminder", (req, res)=> res.send({}))

export default workflowRouter