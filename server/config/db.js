import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("data base connected"))
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error("database connection faild:", error.message);
    
  }
}

export default connectDB;