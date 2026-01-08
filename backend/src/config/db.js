import mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from .env file");
    }

    // No process.exit here. Let the caller (server.js) decide what to do.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
};