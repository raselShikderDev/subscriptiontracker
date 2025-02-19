import UserSchema from "../Models/userSchema.js";
import jwt from 'jsonwebtoken'

export const authorize = async(req, res, next)=>{
    try{
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split('')[0]
        }
        if(!token) return res.status(401).json({message:"Unauthorized"})
            const decoded = jwt.verify(token, process.env.JSON_SECRET)
            const user = await UserSchema.findById(decoded.userId)
            if(!user){
                 return res.status(401).json({message:"Unauthorized"})
            }
            res.user = user
            next()
    }catch(error){
        return res.status(401).json({message:"Unauthorized", error:error.message})
    }
}