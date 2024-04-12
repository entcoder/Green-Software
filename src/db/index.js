import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'videotube', // Specify the database name here
            
        });

        console.log(`Database is connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in connection FAILED: ", error);
        process.exit(1);
    } 
} 
  
export default connectDB;
 