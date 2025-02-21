import dayjs from "dayjs"
import {emailTemplates, generateEmailTemplate} from "./utils/emailTemplate.js"
import transporter "./config/nodeMailer.js"

export const sendReminderEmail = async(to, type, susbcription) =>{
    if(!to || !type){
        throw new Error("Missing required parameter");
    }

    const template = emailTemplates.find((t)=>t.label === type)
    if(!template){
        throw new Error("Invalid template type")
    }
    
    
}

