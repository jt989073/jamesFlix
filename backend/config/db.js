import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log('Connect to Mongo' + conn.connection.host)
    } catch (e) {
        console.error("Error connecting to mongo: ", e.message)
        process.exit(1)
    }
}