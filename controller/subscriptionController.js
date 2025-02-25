/* eslint-disable no-unused-vars */
import { workflowClient } from "../config/spalsh.js"
import SubscriptionSchema from "../Models/subscriptionSchema.js"

export const createSubscription = async (res, req, next) =>{
     try{
        const subscription = await SubscriptionSchema.create({
            ...req.body,
            user:req.user._id
        })

        await workflowClient({
            baseurl:`${process.env.SERVER_URL}/api/v1/workfolows/subscription/reminder`,
            body:{
                subscriptionId:subscription.id
            },
            headers:{
                "content-type": "Application/json"
            },
            retries: 0,
        })
        
        res.status(201).json({success:true,data:subscription})
    } catch(error){
        next(error)
    }
}

export const getUserSubscription = async (req, res, next) =>{
    try{
        if(req.user.id !== req.params.id){
            const error = new Error("Unauthorized owner of subscription")
            error.message(401)
            throw error
        }
        const subscription = await SubscriptionSchema.find({user:req.params.id})
        res.status(201).json({success:true, data:subscription})
    } catch (error){
        next(error)
    }
}
