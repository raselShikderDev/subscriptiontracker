import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import userSchema from "../Models/userSchema";

export const signIn = async(req, res, next) => {
  const session = mongoose.startSession();
  session.startTransaction();
  try {
    const {username, email, password} = req.body
    const existingUser = userSchema.findOne({email})
    // If user alredy exists
    if(existingUser){
        const error = new Error("User already exists")
        error.statusCode = 409
        throw error
    }

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    next(error)
  }
};
export const signUp = (req, res, next) => {};
export const signOut = (req, res, next) => {};
