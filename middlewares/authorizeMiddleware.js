import UserSchema from "../Models/userSchema";
import bcryptjs from "bcryptjs";

export const authorize = async(req, res, next)=>{
    try{
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split('')[0]
        }

        if(!token) return res.status(401).json({success:false, message:"Unauthorized"})
        
            const decoded = await bcryptjs.verify(token, process.env.JSON_SECRET)
            const user = await UserSchema.findById({decoded.userId})

    }catch(error){
        next(error)
    }
}