import { createRequire } from "module";
const require = createRequire(import.meta.url)
import { serve } from "@upstash/workflow/express";
import SubscriptionSchema from "../Models/subscriptionSchema";

export const sendRemainders = serve( async(context)=>{
 const {subscriptionId } = context.requestPayload
 const subscription = await fetchSubscription(context, subscriptionId)
}) 

const fetchSubscription = (context, subscriptionId) =>{

}