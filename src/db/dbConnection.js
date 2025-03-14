import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMONGODB connected Successfully!! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in connecting DB!!");
        process.exit(1);
    }
};

export default connectDB;