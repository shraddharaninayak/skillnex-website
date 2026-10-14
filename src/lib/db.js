import mongoose from "mongoose";

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log("Connected to MongoDB Atlas successfully.");
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error);
    throw error;
  }
}
