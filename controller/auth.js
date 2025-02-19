/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserSchema from "../Models/userSchema.js";

export const signUp = async(req, res, next) => {
  const session = mongoose.startSession();
  session.startTransaction();
  try {
    const {name, username, email, password} = req.body
    const existingUser = await UserSchema.findOne({email})
    // If user alredy exists
    if(existingUser){
        const error = new Error("User already exists")
        error.statusCode = 409
        throw error
    }

    const hasedPassword = await bcryptjs.hash(password, 10)
    const newUser = await UserSchema.create([{name, username, password:hasedPassword, email}])
    if(!newUser){
      console.Error("Creating new user is faild")
    }

    const token = jwt.sign({userId:newUser[0]._id}, process.env.JSON_SECRET, {expiresIn:process.env.JSON_EXPIRY})
    console.log(`Token: ${token}`)
    if(!token){
      console.log("Creating new Token is faild")
    }
    await session.commitTransaction()
    await session.endSession()

    res.status(201).json({
      success:true,
      message:"User created successfully",
      data:{
        token,
        user:newUser
      }
    })

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    next(error)
  }
};
export const signIn = async(req, res, next) => {
  try{
    const {email, password} = req.body
    const user = UserSchema.findOne({email})
    
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if(!isPasswordValid){
      const error = new Error("Invalid Password")
      error.statusCode = 401
      throw error
    }

const token = jwt.sign({userId:user._id}, process.env.JSON_SECRET, {expiresIn:process.env.JSON_EXPIRY})
    res.status(200).json({
      success:true,
      messge: "User successfully logged in",
      data:{
        token,
        user
      }
    })
  } catch(error){
    next(error)
  }
};
export const signOut = (req, res, next) => {};
