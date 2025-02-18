import mongoose from "mongoose";

const mongodbUrl = process.env.MONGO_DB_URI

if (!mongodbUrl) {
   throw new Error("Connect your MongoDb Database or cheak your envoirnment varriable")
}

const connectDatabse = async()=>{
    try{
        await mongoose.connect(mongodbUrl)
        console.log("MongoDb connected successfully")
    }catch(error){
        console.error("Database connecting faild: ", error)
    }
}

export default connectDatabse