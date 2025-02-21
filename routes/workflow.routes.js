import { Router } from "express";
import { sendRemainders } from "../controller/workfolowsController";

const workflowRouter = Router()

workflowRouter.get("/subscription/reminder", sendRemainders)

export default workflowRouter