import UserSchema from "../Models/userSchema.js";

// Getting all users 
export const getAllUsers = async(req, res, next)=>{
    try{
        const allUsers = await UserSchema.find()
        if(!allUsers){
            const error = new Error("Getting all users is faild")
            error.message= 404
            throw error
        }

        res.status(200).json({success:true, data:allUsers})
    } catch(error){
        next(error)
    }
}
// Getting the user
export const getUser = async(req, res, next)=>{
    try{
        const user = await UserSchema.findById(req.params.id).select('-password')
        if(!user){
            const error = new Error("Getting user is faild")
            error.message= 404
            throw error
        }
        res.status(200).json({success:true, data:user})
    } catch(error){
        next(error)
    }
}