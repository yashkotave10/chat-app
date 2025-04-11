import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://sanketagrawal6969:3HQkaPT8fBOSvfGa@cluster0.3hign.mongodb.net/chatdb?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error in databse:", error);
  }
};
