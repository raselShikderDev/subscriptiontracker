import { createRequire } from "module";
import dayjs from "dayjs";
import SubscriptionSchema from "../Models/subscriptionSchema.js";
import { sendReminderEmail } from "../utils/sendReminderEmail.js";
const require = createRequire(import.meta.url)
const { serve } = require("@upstash/workflow/express");

const reminders =[1, 2, 5, 7, 15]

export const sendRemainders = serve( async(context)=>{
 const {subscriptionId } = context.requestPayload
 const subscription = await fetchSubscription(context, subscriptionId)

 if(!subscription.status !== "active" || !subscription) return

 const renewalDate = dayjs(subscription.renewalDate)

 if(renewalDate.isBefore(dayjs())){
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow!`)
    return
 }

for (const daysBefore of reminders) {
   const reminderDate = renewalDate.subtract(reminders, "day")
    if(reminderDate.isAfter(dayjs())){
        await sleepUntilReminder(context, `${daysBefore} days remaining`, reminderDate)
    }

    if(dayjs().isSame(reminderDate, "day")){
        await trrigerReminder(context, `${daysBefore} days remainig`, subscription)
    }
}

}) 

const fetchSubscription = async(context, subscriptionId) =>{
    return await context.run("get subscription", async()=>{
        return await SubscriptionSchema.findById(subscriptionId).populate("user", "name email")
    })
}

const sleepUntilReminder = async(context, label, date) =>{
    console.log(`Sleeping until ${label}, Reminder at ${date}`)
    await context.sleepUntill(date, date.toDate())
}

const trrigerReminder = async(context, label, subscription)=>{
    
    await context.run(label, async()=>{
        console.log(`Trrigering ${label} message`)
        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription
        })
    })
}