import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const c_instance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`Mogodb connected on ${c_instance.connection.host}`);
  } catch (error) {
    console.log("ERROR in mongodb connection : ", error);
    process.exit(1);
  }
};

export default connectDB;
